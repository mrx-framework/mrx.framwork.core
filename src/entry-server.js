import { createApp } from "./main";
import ApolloSSR from 'vue-apollo/ssr'

export default context => {
  return new Promise(async (resolve, reject) => {
    const s = Date.now()
    const { app, router, store , apolloProvider } = await createApp({
      ...context,
      ssr: true
    })

    context.meta = app.$meta()

    router.push(context.url)

    router.onReady(() => {
      if (store.state.error) store.commit("CLEAR_ERROR")

      const matchedComponents = router.getMatchedComponents()

      Promise.all(matchedComponents.map((component) => {
        return component.asyncData && component.asyncData({
          store,
          route: router.currentRoute
        })
      })).then(() => {
        console.log(`data pre-fetch: ${Date.now() - s}ms`)
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        context.state = store.state

        context.apolloState = ApolloSSR.getStates(apolloProvider)

        resolve(app)
      }).catch(reject)

      resolve(app)
    }, reject)
  })
}
