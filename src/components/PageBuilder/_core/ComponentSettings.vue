<template>
  <div>
    <v-container fluid v-if="showSettings">
      <v-row>
        <v-col sm="12" v-for="(value, key) in componentSettings.props" :key="key">
          <template v-if="value.type === 'Boolean'">
            <v-switch v-model="models[key]" :label="key" :hint="value.description" persistent-hint />
          </template>
          <template v-if="value.type === 'String'">
            <v-text-field v-model="models[key]" :label="key" :hint="value.description" persistent-hint outlined clearable />
          </template>
          <template v-if="value.type === 'Number'">
            <v-text-field type="number" v-model="models[key]" :label="key" :hint="value.description" persistent-hint outlined clearable/>
          </template>
          <template v-if="value.type === 'Enum'">
            <v-select v-model="models[key]" :label="key" :hint="value.description" persistent-hint :items="value.values" outlined />
          </template>
        </v-col>
      </v-row>
    </v-container>
    <div v-else>lol</div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import { camelCase } from "lodash"
  import settings from "../settings"

  export default {
    name: "ComponentSettings",
    computed: {
      ...mapState("builder", ["activeComponent", "currentPage"]),
      componentSettings () {
        const componentName = camelCase(
          this.activeComponent.name.replace(/(\.\/|\.js)/g, "")
        )
        return settings[componentName]
      }
    },
    data: () => ({
      models: {
        class: "",
        style: ""
      },
      showSettings: false
    }),
    watch: {
      models: {
        handler: "CHANGE_COMPONENT",
        deep: true
      }
    },
    methods: {
      INIT_MODELS () {
        const { props } = this.componentSettings
        const componentProps = JSON.parse(this.activeComponent.properties)
        Object.keys(props).forEach(key => {
          let value = componentProps[key] || props[key].default
          if (value) {
            this.$set(this.models, key, value)
          }
        })
        this.showSettings = true
      },
      CHANGE_COMPONENT (props) {
        const currentComponent = Object.assign({}, this.activeComponent)
        currentComponent.properties = JSON.stringify(props)
        this.$store.dispatch("builder/CHANGE_ACTIVE_COMPONENT", currentComponent)
        //this.$store.dispatch("builder/SET_CURRENT_PAGE", page)
      }
    },
    mounted () {
      this.INIT_MODELS()
    }
  }
</script>

