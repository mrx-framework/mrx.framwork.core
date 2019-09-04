export default {
  methods: {
    cacheHandler(args) {
      const { actionType, proxy, data, currentQueryVariables } = args
      switch (actionType) {
        case 1: {
          this.addToCache(proxy, data, currentQueryVariables)
          break
        }
        case 2: {
          this.updateCache(proxy, data, currentQueryVariables)
          break
        }
        case 3: {
          this.removeFromCache(proxy, data, currentQueryVariables)
          break
        }
        case 5: {
          this.attachToCache(proxy, data, currentQueryVariables)
          break
        }
        case 6: {
          this.detachFromCache(proxy, data, currentQueryVariables)
          break
        }
      }
    },
    addToCache (proxy, data, currentQueryVariables) {
      const definition = this.definition
      const { getList, createItem } = definition.handlers
      const createMethod = createItem.definitions[0].name.value

      if (createMethod) {

        try {
          // GET DATA IN CACHE
          const cache = proxy.readQuery({
            query: getList,
            variables: currentQueryVariables
          })

          // ADD ITEM TO CACHE
          cache[definition.name.plural].data.push(data[createMethod])
          cache[definition.name.plural].data.total++

          // WRITE CACHE
          proxy.writeQuery({
            query: getList,
            variables: currentQueryVariables,
            data: cache
          })
        } catch (error) {
          this.onError(error, "ADD TO CACHE")
        }
      }
    },
    removeFromCache (proxy, data, currentQueryVariables) {
      const definition = this.definition
      const { getList, destroyItem } = definition.handlers
      const destroyMethod = destroyItem.definitions[0].name.value

      if (destroyMethod) {
        try {
          // GET DATA IN CACHE
          const cache = proxy.readQuery({
            query: getList,
            variables: currentQueryVariables
          })

          for(let i = 0; i < data[destroyMethod].length; i++) {
            let item = data[destroyMethod][i]
            const index = cache[definition.name.plural].data.findIndex(u => u.id === item.id)
            if (index > -1) {
              cache[definition.name.plural].data.splice(index, 1)
              proxy.data.delete(`${item.__typename}:${item.id}`)
              cache[definition.name.plural].data.total--
            }
          }

          // WRITE CACHE
          proxy.writeQuery({
            query: getList,
            variables: currentQueryVariables,
            data: cache
          })
        }catch (error) {
          this.onError(error, "REMOVE FROM CACHE")
        }
      }
    },
    updateCache (proxy, data) {
      console.log(proxy, data)
    },
    attachToCache(proxy, data, currentQueryVariables) {
      const definition = this.definition
      const parentDefinition = this.data.parent.definition
      const { getItem } = parentDefinition.handlers
      const attachMethod = parentDefinition.attach[definition.name.plural].definitions[0].name.value

      if (attachMethod) {
        try {
          // GET DATA IN CACHE
          const cache = proxy.readQuery({
            query: getItem,
            variables: currentQueryVariables
          })

          // ATTATCH TO CACHE
          let dataStore = cache[parentDefinition.name.singular][definition.name.plural].data
          data[attachMethod].forEach(newItem => {
            const _alreadyExists = dataStore.findIndex(d => d.id === newItem.id)
            if (_alreadyExists === -1) {
              dataStore.push(newItem)
              cache[parentDefinition.name.singular][definition.name.plural].total++
            }
            else {
              console.log("ALREADY IN CACHE")
            }
          })

          // WRITE TO CACHE
          proxy.writeQuery({
            query: getItem,
            variables: currentQueryVariables,
            data: cache
          })
        } catch (error) {
          this.onError(error, "ATTACH TO CACHE")
        }
      }

    },
    detachFromCache(proxy, data, currentQueryVariables) {
      const definition = this.definition
      const parentDefinition = this.data.parent.definition
      const { getItem } = parentDefinition.handlers
      const detachMethod = parentDefinition.detach[definition.name.plural].definitions[0].name.value

      if (detachMethod) {
        try {
           // GET DATA IN CACHE
          const cache = proxy.readQuery({
            query: getItem,
            variables: currentQueryVariables
          })

          // DETACH FROM CACHE
          let dataStore = cache[parentDefinition.name.singular][definition.name.plural].data
          data[detachMethod].forEach(newItem => {
            const _alreadyExists = dataStore.findIndex(d => d.id === newItem.id)
            if (_alreadyExists > -1) {
              dataStore.splice(_alreadyExists, 1)
              cache[parentDefinition.name.singular][definition.name.plural].total--
            }
            else {
              console.log("CANT FIND IN CACHE")
            }
          })

          // WRITE TO CACHE
          proxy.writeQuery({
            query: getItem,
            variables: currentQueryVariables,
            data: cache
          })
        } catch (error) {
          this.onError(error, "DETACH FROM CACHE")
        }
      }
    },
    onError (error, source) {
      console.log("ERROR IN SOURCE: ", source)
      if (error.graphQLErrors && error.graphQLErrors.length !== 0) {
        console.error(
          `GraphQL execution errors for ${this.type} '${this.key}'`
        )
        for (let e of error.graphQLErrors) {
          console.error(e)
        }
      } else if (error.networkError) {
        console.error(
          `Error sending the ${this.type} '${this.key}'`,
          error.networkError
        )
      } else {
        console.error(
          `[vue-apollo] An error has occured for ${this.type} '${this.key}'`
        )
        if (Array.isArray(error)) {
          console.error(...error)
        } else {
          console.error(error)
        }
      }
    },
  }
}
