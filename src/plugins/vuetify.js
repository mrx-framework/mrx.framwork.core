import Vue from "vue"
import Vuetify from "vuetify"
import { TiptapVuetifyPlugin } from "tiptap-vuetify"
import "vuetify/dist/vuetify.min.css"
import "tiptap-vuetify/dist/main.css"
import "@mdi/font/css/materialdesignicons.min.css"
import "roboto-fontface/css/roboto/roboto-fontface.css"

Vue.use(Vuetify)
Vue.use(TiptapVuetifyPlugin, {
  iconsGroup: "mdi"
})

export default new Vuetify({
  iconfont: "mdi"
})
