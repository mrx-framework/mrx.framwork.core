import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import api from '@/api'
import { getRoutes } from "@/api/apollo/queries"

Vue.use(Router)
Vue.use(Meta)

export const createRouter = async () => {
  let _routes = []

  try {
    const _dbRoutes = await api.GQL_QUERY({
      query: `query { routes {  id title path component layout isStatic } }`,
    })
    _routes = _dbRoutes.data.data.routes.map(route => {
      const isAdmin = route.path.indexOf('/admin') !== -1
      let layout = route.layout ? route.layout : (isAdmin ? 'admin' : 'main')
      const meta = { layout }
      const component = route.component ?
       () => import(`@/pages${route.component}`) :
       () => import(`@/pages/frontend/DynamicPage.vue`)


      return {
        path: route.path,
        meta,
        component
      }
    })
  }
  catch (e) {
    console.log('CANNOT GET ROUTES FROM GRAPH: ', e)
  }

  return new Router({
    mode: 'history',
    routes: [
      ..._routes,
      {
        path: '/login',
        meta: { layout: 'blank' },
        component: () => import('@/pages/auth/Login.vue')
      }
    ]
  })
}
