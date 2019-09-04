<template>
   <v-expansion-panels accordion class="component__settings" v-if="component">
      <v-expansion-panel>
        <v-expansion-panel-header>Vuetify Properties</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-if="showSettings" dense>
            <v-col cols="12" v-for="(value, key) in componentSettings.props" :key="key">
              <template v-if="value.type === 'Boolean'">
                <v-switch v-model="models[key]" :label="key" :hint="value.description" persistent-hint />
              </template>
              <template v-if="value.type === 'String'">
                <v-text-field v-model="models[key]" :label="key" :hint="value.description" persistent-hint clearable />
              </template>
              <template v-if="value.type === 'Number'">
                <v-text-field
                  type="number"
                  v-model="models[key]"
                  :label="key"
                  :hint="value.description"
                  :min="componentProps[key].min || undefined"
                  :max="componentProps[key].max || undefined"
                  persistent-hint
                  clearable/>
              </template>
              <template v-if="value.type === 'Media'">
                 <v-text-field
                    type="text"
                    v-model="models[key]"
                    :label="key"
                    :hint="value.description"
                    persistent-hint
                    append-icon="mdi-plus-circle-outline"
                    @click:append="SELECT_MEDIA(key)"
                    clearable/>
              </template>
              <template v-if="value.type === 'Enum'">
                <v-select v-model="models[key]" :label="key" :hint="value.description" persistent-hint :items="value.values" clearable />
              </template>
              <template v-if="value.type === 'Lookup'">
                <Lookup :definition="value.definition" @onSelected="selected => models[key] = selected" :prefilled="models[key]" />
              </template>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>General Properties</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-if="showSettings" dense>
            <v-col cols="12" v-for="(value, key) in generalProps" :key="key">
              <template v-if="value.type === 'Boolean'">
                <v-switch v-model="models[key]" :label="key" :hint="value.description" persistent-hint />
              </template>
              <template v-if="value.type === 'String'">
                <v-text-field v-model="models[key]" :label="key" :hint="value.description" persistent-hint clearable />
              </template>
              <template v-if="value.type === 'Number'">
                <v-text-field
                  type="number"
                  v-model="models[key]"
                  :label="key"
                  :hint="value.description"
                  :min="componentProps[key].min || undefined"
                  :max="componentProps[key].max || undefined"
                  persistent-hint
                  clearable/>
              </template>
              <template v-if="value.type === 'Media'">
                 <v-text-field
                      type="text"
                      v-model="models[key]"
                      :label="key"
                      :hint="value.description"
                      :min="componentProps[key].min || undefined"
                      :max="componentProps[key].max || undefined"
                      persistent-hint
                      append-icon="mdi-plus-circle-outline"
                      @click:append="SELECT_MEDIA(key)"
                      clearable/>
              </template>
              <template v-if="value.type === 'Enum'">
                <v-select v-model="models[key]" :label="key" :hint="value.description" persistent-hint :items="value.values" />
              </template>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-if="componentContent">
        <v-expansion-panel-header>Content</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" v-if="componentContent.type === 'String'">
               <v-text-field label="Text" v-model="content" hint="The innerText" persistent-hint />
            </v-col>
            <v-col cols="12" v-if="componentContent.type === 'HTML'">
               <v-btn block @click="EDIT_HTML_CONTENT">
                 Edit HTML Content
               </v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
  import { mapGetters } from "vuex"
  import { camelCase, debounce } from "lodash"
  import settings from "../settings"

  export default {
    name: "ComponentSettings",
    components: {
      Lookup: () => import("@/components/CRUD/Lookup")
    },
    computed: {
      ...mapGetters({
        component: "builder/SELECTED_COMPONENT"
      }),
      componentSettings () {
        const { name } = this.component
        const moduleName = camelCase(
          name.replace(/(\.\/|\.js)/g, "")
        )
        console.log(settings, moduleName)
        return settings[moduleName]
      },
      componentProps () {
        return this.componentSettings.props
      },
      componentContent () {
        return this.componentSettings.content ?
          this.componentSettings.content.content : null
      },
      vuetifyProps () {
        return this.componentSettings.props
      },
      generalProps () {
        return this.componentSettings.general
      },
      hasContent () {
        return this.component && this.component.childs.length === 0
      }
    },
    data: () => ({
      models: {},
      showSettings: false,
      skip: false,
      skipContent: false,
      selectMedia: true,
      content: ""
    }),
    watch: {
      models: {
        handler: debounce(function (to, from) {
          this.CHANGE_COMPONENT_PROPERTIES(to)
        }, 350),
        deep: true
      },
      component: {
        handler (newComponent) {
          if (!newComponent) return this.$store.dispatch("builder/CHANGE_DRAWER_VIEW", 2)
          const newProps = newComponent.properties
          const oldProps = JSON.stringify(this.models)

          if (newProps !== oldProps) {
            this.skip = true
            this.models = JSON.parse(newProps)
          }

          if (newComponent.content && newComponent.content !== this.content) {
            this.skipContent = true
            this.content = newComponent.content
          }
        },
        deep: true
      },
      content: {
        handler: debounce(function (to, from) {
          if (to && to !== from) {
            this.CHANGE_COMPONENT_CONTENT(to)
          }
        }, 250)
      }
    },
    methods: {
      INIT_MODELS () {
        const { props, general } = this.componentSettings
        const componentProps = JSON.parse(this.component.properties)
        const componentContent = this.component.content ? this.component.content : ""
        Object.keys(props).forEach(key => {
          let value = componentProps[key] || props[key].default
          if (value) {
            this.$set(this.models, key, value)
          }
        })
        Object.keys(general).forEach(key => {
          let value = componentProps[key] || general[key].default
          if (value) {
            this.$set(this.models, key, value)
          }
        })
        this.content = componentContent
        this.showSettings = true
      },
      CHANGE_COMPONENT_PROPERTIES (props) {
        if (this.skip){
          this.skip = false
          return
        }
        this.$store.dispatch("builder/CHANGE_CURRENT_COMPONENT_PROPERTIES", JSON.stringify(props))
      },
       CHANGE_COMPONENT_CONTENT (content) {
        if (this.skipContent){
          this.skipContent = false
          return
        }
        this.$store.dispatch("builder/CHANGE_CURRENT_COMPONENT_CONTENT", content)
      },
      SELECT_MEDIA (key) {
        const payload = {
          component: this.component,
          key
        }
        this.$emit("SELECT_MEDIA_FOR_COMPONENT", payload)
      },
      EDIT_HTML_CONTENT () {
        const payload = {
          component: this.component,
          content: this.content
        }
        this.$emit("EDIT_HTML_CONTENT_FOR_COMPONENT", payload)
      }
    },
    mounted () {
      this.INIT_MODELS()
    }
  }
</script>

<style lang="scss">
  .component__settings {
    .v-expansion-panel--active .v-expansion-panel-header {
      min-height: 48px;
    }
  }
</style>
