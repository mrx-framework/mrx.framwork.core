import Vue from "vue"
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import VueApollo from "vue-apollo"
import fetch from "node-fetch"
import config from "../../config"

Vue.use(VueApollo)

export const createApolloClient = (ssr = false) => {
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

  const httpLink = new HttpLink({
    uri: `${config.server.ssl ? "https" : "http"}://${config.server.host}:${config.server.port}/graphql`,
    fetch,
    credentials: "include",
    rejectUnauthorized: true
  })

  const cache = new InMemoryCache()

  if (!ssr) {
    if (typeof window !== "undefined") {
      const state = window.__APOLLO_STATE__
      if (state) {
        // If you have multiple clients, use `state.<client_id>`
        cache.restore(state.defaultClient)
      }
    }
  }

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    connectToDevTools: config.mode !== "production",
    ...(ssr ? {
      // Set this on the server to optimize queries when SSR
      ssrMode: true,
    } : {
      // This will temporary disable query force-fetching
      ssrForceFetchDelay: 100,
    }),
  })

  return apolloClient
}
