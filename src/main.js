import Vue from "vue"
import App from "./themes/default/App"
import VueApollo from "vue-apollo"
import { sync } from "vuex-router-sync"
import AsyncComputed from "vue-async-computed"

import vuetify from "./plugins/vuetify"
import "./plugins/perfectScrollbar"
import "./plugins/moment"
import AOS from "./plugins/aos"
import { createI18n } from "./plugins/i18n"
import { createApolloClient } from "./plugins/apollo"

import { createRouter } from "./router"
import { createStore } from "./store"

Vue.use(AsyncComputed)

export const createApp = async (context) => {
  const router = await createRouter()
  const store = createStore()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // Apollo

  const apolloClient = createApolloClient(context.ssr)

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    errorHandler (error) {
      // eslint-disable-next-line no-console
      console.log("%cError", "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;", error.message)
    }
  })

  const i18n = createI18n()

  const app = new Vue({
    mounted () {
      AOS.init({
        duration: 1000
      })
    },
    router,
    store,
    context,
    apolloProvider,
    i18n,
    vuetify,
    render: h => h(App)
  })

  return { app, router, store, apolloProvider }
}
