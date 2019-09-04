import { cloneDeep } from "lodash"
const state = {
  drawerView: 2,
  screenSize: 0,
  selectedComponentId: 0,
  breadCrumb: null,
  version: -1,
  versions: []
}

let breadCrumb = null

const getters = {
  PAGE_COMPONENTS: (state, getters) => {
    const components = getters.GET_CURRENT_PAGE && getters.GET_CURRENT_PAGE.components ?
      getters.GET_CURRENT_PAGE.components :
      []
    console.log("PAGE COMPONENTS: ", components)
    return components
  },
  SELECTED_COMPONENT: (state, getters) => {
    const components = getters.PAGE_COMPONENTS
    return findDeep(components, state.selectedComponentId)
  },
  GET_CURRENT_PAGE: (state) => {
    const version = state.version
    const currentVersion = state.versions[version - 1]
    return cloneDeep(currentVersion)
    //return Object.assign({}, state.versions[version - 1])
  },
}

const actions = {
  BUILD_BREADCRUMB({ commit }, component) {
    commit("SET_BREADCRUMB", component)
  },
  ADD_COMPONENT({ state, getters, dispatch }, payload) {
    // Get current version of the page
    const currentPage = Object.assign({}, getters.GET_CURRENT_PAGE)
    const component = getters.SELECTED_COMPONENT

    if (!component) {
      payload.order = currentPage.components.length + 1
      const _components = renameComponents([payload])
      currentPage.components.push( _components[0] )
    }
    else {
      // We take the components of the page find the selected one and push childs
      let components = cloneDeep(getters.PAGE_COMPONENTS)
      let c = findDeep(components, state.selectedComponentId)
      if (c.childs) {
        payload.order = c.childs.length + 1
        c.childs.push(payload)
      }
      else {
        c.childs = [payload]
      }

      // now we assign the components (immutable) to the current page
      currentPage.components = renameComponents(components)
    }

    currentPage.versionTime = Date.now()
    dispatch("ADD_VERSION", currentPage)
    dispatch("CHANGE_SELECTED_COMPONENT_ID", payload.id)
    dispatch("CHANGE_DRAWER_VIEW", 1)
    //commit("SET_CURRENT_PAGE", currentPage)
  },
  REMOVE_COMPONENT({ getters, dispatch }, payload) {
    // Get current version of the page
    const currentPage = Object.assign({}, getters.GET_CURRENT_PAGE)

    let components = cloneDeep(getters.PAGE_COMPONENTS)
    let c = findDeep(components, payload.id, null, true)

    if (!c.parent) {
      components = components.filter(i => i.id !== payload.id)
    } else {
      c.parent.childs = c.parent.childs.filter(i => i.id !== payload.id)
    }

    currentPage.components = components
    currentPage.versionTime = Date.now()
    dispatch("ADD_VERSION", currentPage)
    dispatch("CHANGE_SELECTED_COMPONENT_ID", c.parent.id)

  },
  MOVE_COMPONENT({ getters, dispatch }, payload) {
    // Get current version of the page
    const currentPage = Object.assign({}, getters.GET_CURRENT_PAGE)

    let components = cloneDeep(getters.PAGE_COMPONENTS)
    let c = findDeep(components, payload.from.id, null, true)

    if (!c.parent) {
      components = components.filter(i => i.id !== payload.from.id)
    } else {
      c.parent.childs = c.parent.childs.filter(i => i.id !== payload.from.id)
    }

    if (payload.to.id !== 0) {
      let to = findDeep(components, payload.to.id)
      payload.from.order = to.childs.length + 1
      const _component = renameComponents([payload.from])
      to.childs.push(_component[0])
      dispatch("CHANGE_SELECTED_COMPONENT_ID", payload.from.id)
    } else {
      payload.from.order = components.length + 1
      const _component = renameComponents([payload.from])
      components.push(_component[0])
      dispatch("CHANGE_SELECTED_COMPONENT_ID", 0)
    }


    currentPage.components = components
    currentPage.versionTime = Date.now()
    dispatch("ADD_VERSION", currentPage)
  },
  MOVE_UP({ dispatch, getters }, payload) {
    // Get current version of the page
    const currentPage = Object.assign({}, getters.GET_CURRENT_PAGE)

    let components = cloneDeep(getters.PAGE_COMPONENTS)
    let c = findDeep(components, payload.id, null, true)

    const { parent, found } = c
    let childs = parent ? parent.childs : components

    found.order--
    childs = childs.filter(c => c.id !== payload.id)
    childs.splice((found.order - 1), 0, found)
    if (!parent) {
      components = childs
      if (found.order > components.length) return console.log("IS AT FIRST")
    } else {
      parent.childs = childs
      if (found.order > parent.childs.length) return  console.log("IS AT FIRST")
    }

    // Reorder
    childs.forEach((c, i) => c.order = (i + 1))

    currentPage.components = components
    currentPage.versionTime = Date.now()
    dispatch("ADD_VERSION", currentPage)
    //dispatch("CHANGE_SELECTED_COMPONENT_ID", c.parent.id)
  },
  MOVE_DOWN({ dispatch, getters }, payload) {
    // Get current version of the page
    const currentPage = Object.assign({}, getters.GET_CURRENT_PAGE)

    let components = cloneDeep(getters.PAGE_COMPONENTS)
    let c = findDeep(components, payload.id, null, true)

    const { parent, found } = c
    let childs = parent ? parent.childs : components

    found.order++
    childs = childs.filter(c => c.id !== payload.id)
    childs.splice((found.order - 1), 0, found)
    if (!parent) {
      components = childs
      if (found.order > components.length) return
    } else {
      parent.childs = childs
      if (found.order > parent.childs.length) return
    }

    // Reorder
    childs.forEach((c, i) => c.order = (i + 1))


    currentPage.components = components
    currentPage.versionTime = Date.now()
    dispatch("ADD_VERSION", currentPage)
    //dispatch("CHANGE_SELECTED_COMPONENT_ID", c.parent.id)
  },
  CHANGE_CURRENT_COMPONENT_PROPERTIES({ dispatch, getters, state }, props) {
    const currentPage = Object.assign({}, getters.GET_CURRENT_PAGE)

    let components = cloneDeep(getters.PAGE_COMPONENTS)
    let c = findDeep(components, state.selectedComponentId)
    if (c && c.properties !== props) {
      c.properties = props
      currentPage.components = components.slice()
      currentPage.versionTime = Date.now()
      dispatch("ADD_VERSION", currentPage)
    }
  },
  CHANGE_CURRENT_COMPONENT_CONTENT({ dispatch, getters, state }, content) {
    const currentPage = Object.assign({}, getters.GET_CURRENT_PAGE)

    let components = cloneDeep(getters.PAGE_COMPONENTS)
    let c = findDeep(components, state.selectedComponentId)
    if (c && c.content !== content) {
      c.content = content
      currentPage.components = components.slice()
      currentPage.versionTime = Date.now()
      dispatch("ADD_VERSION", currentPage)
    }
  },
  CHANGE_SELECTED_COMPONENT_ID({ commit, getters, state }, id) {
    if (id === 0) {
      //dispatch("CHANGE_DRAWER_VIEW", 2)
      commit("SET_BREADCRUMB", null)
    }
    commit("SET_SELECTED_COMPONENT_ID", id)

    const components = getters.PAGE_COMPONENTS
    breadCrumb = null
    buildBreadcrumb(components, state.selectedComponentId)
    commit("SET_BREADCRUMB", breadCrumb)
  },
  CHANGE_DRAWER_VIEW({ commit }, payload) {
    commit("SET_DRAWER_VIEW", payload)
  },
  CHANGE_SCREEN_SIZE({ commit }, size) {
    commit("SET_SCREEN_SIZE", size)
  },
  ADD_VERSION({ commit, state }, version) {
    // Get all versions from state
    const versions = state.versions.slice()


    // Check if this is the initial version
    if (versions.length === 0) {
      // We assume here, that the versiontime is already set by index.vue

      // We set the version number + 1 and commit to state
      const versionNumber = versions.length + 1
      commit("SET_VERSION", versionNumber)

      // Add the version number to the current version of the page and push to state
      //version.localVersion = versionNumber
      versions.push(version)
      return commit("SET_VERSIONS", versions)
    }

    // Check if we change something from a different versions start than the last
    // => example: After some undos
    if (state.version < versions.length) {
      const sliceIndex = state.version
      versions.length = sliceIndex
    }

    // Get the last version
    const lastVersion = versions[versions.length - 1]
    if (checkVersions(lastVersion, version)) {
      if (lastVersion.versionTime < version.versionTime) {
        // this is a new versions - so we push into the array

        // We set the version number + 1 and commit to state
        const versionNumber = versions.length + 1
        commit("SET_VERSION", versionNumber)

        // Add the version number to the current version of the page and push to state
        //version.localVersion = versionNumber
        versions.push(version)
        return commit("SET_VERSIONS", versions)
      }
    }
    // ERROR
    console.log("VERSION IS THE SAME OR OLDER?! COULD BE FROM APOLLO")
  },
  UNDO_VERSION({ commit, state }) {
    const currentVersion = state.version
    const newVersion = currentVersion - 1
    commit("SET_VERSION", newVersion)
  },
  REDO_VERSION({ commit, state }) {
    const currentVersion = state.version
    const newVersion = currentVersion + 1
    commit("SET_VERSION", newVersion)
  }
}

const mutations = {
  SET_DRAWER_VIEW: (state, payload) => state.drawerView = payload,
  SET_CURRENT_PAGE: (state, page) => state.currentPage = page,
  SET_SCREEN_SIZE: (state, size) => state.screenSize = size,
  SET_SELECTED_COMPONENT_ID: (state, id) => state.selectedComponentId = id,
  SET_BREADCRUMB: (state, breadCrumb) => state.breadCrumb = breadCrumb,
  SET_VERSIONS: (state, versions) => {
    state.versions = versions
  },
  SET_VERSION: (state, version) => {
    state.version = version
  },
  RESET_BUILDER: (state) => {
    state.versions = []
    state.version = -1
    state.drawerView = 2
    state.screenSize = 0
    state.selectedComponentId = 0
    state.breadCrumb = null
  }
}

const findDeep = (array, needle, root = null, withParent = false) => {
  let found
  root = root ? root : false
  if (!array || !needle) return
  for (let i = 0; i < array.length; i++) {
    let object = array[i]
    if (object.id === needle) {
      found = withParent ? {
        parent: root,
        found: object
      } : object
    }
    if (object.childs && object.childs.length) {
      let _deepFound = findDeep(object.childs, needle, object, withParent)
      if (_deepFound) {
        found = _deepFound
      }
    }
  }
  return found ? found : false
}

const buildBreadcrumb = (array, needle, rootArray) => {
  if (!rootArray) {
    rootArray = array
  }
  if (!array || !needle) return
  for (let i = 0; i < array.length; i++) {
    let object = array[i]

    if (object.id === needle) {
      if (!breadCrumb) {
        breadCrumb = {
          active: object,
          siblings: array.filter(i => i.id !== object.id)
        }
      }
      else {
        const childBreadcrumb = cloneDeep(breadCrumb)
        breadCrumb = {
          active: object,
          siblings: array.filter(i => i.id !== object.id),
          child: childBreadcrumb
        }
      }
    }

    // check if object has childs
    if (object.childs.length > 0) {
      const { childs } = object
      // check if the object has the needle in childs
      let foundNeedle = childs.findIndex(i => i.id === needle)
      if (foundNeedle > -1) {
        const newNeedle = object.id
        const active = childs[foundNeedle]
        if (!breadCrumb) {
          breadCrumb = {
            active,
            siblings: childs.filter(i => i.id !== active.id)
          }
        }
        else {
          const childBreadcrumb = cloneDeep(breadCrumb)
          breadCrumb = {
            active,
            siblings: childs.filter(i => i.id !== active.id),
            child: childBreadcrumb
          }
        }
        buildBreadcrumb(rootArray, newNeedle, rootArray)
      }
      else {
        buildBreadcrumb(childs, needle, rootArray)
      }
    }
  }
}

const renameComponents = (components) => {
  for (var i = 0; i < components.length; i++){
    let component = components[i]
    const title = component.title.split("#")[0].trim()
    component.title = `${title} #${component.order}`
    component.childs = renameComponents(component.childs)
  }
  return components
}

const checkVersions = (oldVersion, newVersion) => {
  const copyOld = Object.assign({}, oldVersion)
  const copyNew = Object.assign({}, newVersion)

  delete copyOld.versionTime
  delete copyOld.version
  delete copyNew.versionTime
  delete copyNew.version

  const oldString = JSON.stringify(copyOld)
  const newString = JSON.stringify(copyNew)

  return oldString !== newString
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
