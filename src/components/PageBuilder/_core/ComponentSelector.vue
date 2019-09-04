<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4" v-for="setting in settings" :key="setting.component">
        <v-card class="text-center transparent" hover flat @click="ADD_COMPONENT(setting)">
          <v-icon x-large>{{ setting.icon || "mdi-asterisk"}}</v-icon>
          <h2 class="subtitle-2 white--text mt-3">{{setting.name}}</h2>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import settings from "../settings"

  export default {
    name: "ComponentSelector",
    data: () => ({
      settings,
      dialog: false,
      component: null
    }),
    methods: {
      ADD_COMPONENT (component) {
        const { props } = component
        let defaultProps = {}
        Object.keys(props).forEach(key => {
          defaultProps[key] = props[key].default
        })
        const payload = {
          id: (Math.floor(Math.random() * 200000) + 1),
          name: component.component,
          title: component.name,
          properties: JSON.stringify(defaultProps)
        }
        this.$store.dispatch("builder/ADD_COMPONENT_TO_PAGE", payload)
      }
    }
  }
</script>

