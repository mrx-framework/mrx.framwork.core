import { debounce } from "lodash"
import CoreTable from "@/components/DataTable/CoreTable"
import { getDefinitionForQuery } from "@/api/apollo/definitions"

export default {
  components: {
    CoreTable
  },
  computed: {
    isChildModel () {
      return !!(this.$route.query && this.$route.query.child)
    },
    childModel () {
      if (!this.$route.query.child) return false
      return this.$route.query.child
    },
    definition () {
      const model = this.childModel || this.modelName
      return getDefinitionForQuery(model)
    },
    mainDefinition () {
      return getDefinitionForQuery(this.modelName)
    },
    items () {
      return this.data && this.data.items && this.data.items.data ?
        this.data.items.data :
        []
    },
    total () {
      return this.data && this.data.items ?
        this.data.items.total :
        0
    }
  },
  watch: {
    "$route": {
      handler (to) {
        const { toQuery } = to.query
        if (toQuery && toQuery.child) {
          this.$apollo.queries.data.refetch()
        }
      }
    }
  },
  apollo: {
    data: {
      query () {
        return this.isChildModel ?
          this.mainDefinition.handlers.getItem :
          this.mainDefinition.handlers.getList
      },
      variables () {
        return this.isChildModel ?
          {
            id: parseInt(this.$route.query.id),
            page: this.page,
            limit: this.limit,
            query: this.query
          } :
          {
            page: this.page,
            limit: this.limit,
            query: this.query
          }
      },
      update ( response ) {
        if (!Object.keys(response).length) return null
        try {
          const currentDefinition = this.definition
          let data
          if (this.isChildModel) {
            const parentDefinition = getDefinitionForQuery(this.modelName)
            data = {
              parent: {
                definition: parentDefinition,
                data: response[parentDefinition.name.singular]
              },
              items: response[parentDefinition.name.singular][currentDefinition.name.plural]
            }
          }
          else {
            data = {
              items: response[currentDefinition.name.plural]
            }
          }
          return data
        } catch (error) {
          this.onError(error)
        }
      },
      result ( result ) {
        if ("partial" in result) {
          console.log("from server?")
          const { partial } = result
          if (partial) {
            console.log("HERE WE HAVE PARITAL RESULT ?! wtf is that")
          }
        } else {
          console.log("from cache?")
          const { stale } = result
          if (stale) {
            // debugger
            console.log("HERE WE HAVE STALE RESULT ?! wtf is that")
          }
        }
        return result
      },
      error (error) {
       return this.onError(error)
      }
    }
  },
  data: () => ({
    modelName: null,
    data: null,
    page: 1,
    limit: 10,
    query: null
  }),
  methods: {
    async S_ELEMENT(payload) {
      const _self = this
      const { data, actionType } = payload
      const definition = this.definition

      let mutation,
      currentModelName,
      variables,
      currentQueryVariables

      switch (actionType) {
        case 1: {
          // GET MUTATION FOR CREATE DATA AND SET VARIABLES
          mutation = definition.handlers.createItem
          variables = data
          currentQueryVariables = {
            page: this.page,
            limit: this.limit,
            query: this.query
          }
          break
        }
        case 2: {
           // GET MUTATION FOR UPDATE DATA AND SET VARIABLES
           mutation = definition.handlers.updateItem
           variables = data
           currentQueryVariables = {
            page: this.page,
            limit: this.limit,
            query: this.query
          }
          break
        }
        case 5: {
          // GET MUTATION FOR ATTACH ITEM
          const { parent } = this.data
          mutation = parent.definition.attach[this.childModel]
          variables = data
          currentQueryVariables = {
            id: parent.data.id
          }
          break
        }
        default: {
          return console.log("NO DEFINED ACTION TYPE")
        }
      }

      try {
        await this.$apollo.mutate({
          mutation,
          variables,
          update (proxy, { data }) {
            _self.cacheHandler({
              actionType,
              proxy,
              data,
              currentQueryVariables
            })
          },
          error (error) {
            _self.onError(error)
          }
        })
      } catch (error) {
        _self.onError(error)
      }
    },
    async D_ELEMENT(payload) {
      const _self = this
      const { data, actionType } = payload
      const definition = this.definition

      let mutation,
      currentModelName,
      variables,
      currentQueryVariables

      switch (actionType) {
        case 3: {
          // GET MUTATION FOR DESTROY DATA AND SET VARIABLES
          mutation = definition.handlers.destroyItem
          variables = {
            ids: data.idsToDestroy
          }
          currentQueryVariables = {
            page: this.page,
            limit: this.limit,
            query: this.query
          }
          break
        }
        case 6: {
          // GET MUTATION FOR DETACH ITEM
          const { parent } = this.data
          mutation = parent.definition.detach[this.childModel]
          variables = data
          currentQueryVariables = {
            id: parent.data.id
          }
          break
        }
        default: {
          return console.log("NO DEFINED ACTION TYPE")
        }
      }

      try {
        await this.$apollo.mutate({
          mutation,
          variables,
          update (proxy, { data }) {
            _self.cacheHandler({
              actionType,
              proxy,
              data,
              currentQueryVariables
            })
          },
          error (error) {
            _self.onError(error)
          }
        })
      } catch (error) {
        _self.onError(error)
      }
    },
    Q_ELEMENT: debounce(function(query) {
      this.query = query ? query : null
      this.page = 1
      this.limit = 10

      this.$apollo.queries.data.setOptions({
        fetchPolicy: "network-only"
      })

      //this.$apollo.queries.data.refetch()

      this.$apollo.queries.data.setOptions({
        fetchPolicy: "cache-and-network"
      })

    }, 200),
    U_LIMIT (limit) {
      this.limit = limit
      this.$apollo.queries.data.refetch()
    },
    U_PAGE (page) {
      this.page = page
      this.$apollo.queries.data.refetch()
    },
    V_ELEMENT (item) {

      const currentRoute = this.$route
      const { childs } = this.definition

      this.$router.push({
        path: currentRoute.path,
        query: {
          action: "view",
          id: item.id,
          child: childs[0].modelName
        }
      })
    },
    onError (error) {
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
        // GET DATA IN CACHE
        try {
          const cache = proxy.readQuery({
            query: getList,
            variables: currentQueryVariables
          })
          // ADD ITEM TO CACHE
          cache[definition.name.plural].data.unshift(data[createMethod])
          cache[definition.name.plural].data.total++
          if ( cache[definition.name.plural].data.length >= this.limit) {
            cache[definition.name.plural].data.pop()
          }


          // WRITE CACHE
          proxy.writeQuery({
            query: getList,
            variables: currentQueryVariables,
            data: cache
          })
        } catch (error) {
          this.onError(error)
        }
      }
    },
    removeFromCache (proxy, data, currentQueryVariables) {
      const definition = this.definition
      const { getList, destroyItem } = definition.handlers
      const destroyMethod = destroyItem.definitions[0].name.value

      if (destroyMethod) {
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
      }
    },
    updateCache (proxy, data) {

    },
    attachToCache(proxy, data, currentQueryVariables) {
      const definition = this.definition
      const parentDefinition = this.data.parent.definition
      const { getItem } = parentDefinition.handlers
      const attachMethod = parentDefinition.attach[definition.name.plural].definitions[0].name.value

      if (attachMethod) {
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
      }

    },
    detachFromCache(proxy, data, currentQueryVariables) {
      const definition = this.definition
      const parentDefinition = this.data.parent.definition
      const { getItem } = parentDefinition.handlers
      const detachMethod = parentDefinition.detach[definition.name.plural].definitions[0].name.value

      if (detachMethod) {
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
      }
    }
  }
}
