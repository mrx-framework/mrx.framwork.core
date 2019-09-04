<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="4" v-for="component in availableComponents" :key="component.value">
        <v-card class="text-center" hover tile outlined @click="ADD_COMPONENT(component.value)">
          <v-icon class="xxl--icon pa-2" v-text="component.icon" />
          <h2 class="subtitle-1 mt-1" v-text="component.text" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions } from "vuex"
  import settings from "../settings"
  export default {
    name: "ComponentSelector",
    data: () => ({
      availableComponents: [
        {text: "Container 1", icon: "mdi-view-column", value: "1_section"},
        {text: "Container 2", icon: "mdi-view-column", value: "2_section"},
        {text: "Container 3", icon: "mdi-view-column", value: "3_section"},
        {text: "Section", icon: "mdi-crop-free", value: "section"},
        {text: "Button", icon: "mdi-arrow-right-bold-box", value: "button"},
        {text: "Divider", icon: "mdi-arrow-expand-vertical", value: "divider"},
        {text: "Icon", icon: "mdi-star-outline", value: "icon"},
        {text: "Form", icon: "mdi-card-bulleted-outline", value: "form"},
        {text: "Card", icon: "mdi-card-outline", value: "card"},
        {text: "Text", icon: "mdi-cursor-text", value: "text"},
        {text: "Text Section", icon: "mdi-format-float-left", value: "text_section"},
        {text: "Link", icon: "mdi-link", value: "hyperlink"},
        {text: "Image", icon: "mdi-image-outline", value: "image"},
        {text: "Video", icon: "mdi-youtube", value: "video"},
        {text: "Map", icon: "mdi-map", value: "map"},
        {text: "Quote", icon: "mdi-format-quote-close", value: "quote"},
        {text: "Grid items", icon: "mdi-view-module", value: "grid_items"},
        {text: "List items", icon: "mdi-format-list-bulleted", value: "list_items"},
      ]
    }),
    methods: {
      ...mapActions({
        COMPONENT_TO_PAGE: "builder/ADD_COMPONENT"
      }),
      ADD_COMPONENT (component) {
        switch (component) {
          case "1_section": return this.ONE_SECTION()
          case "2_section": return this.TWO_SECTION()
          case "3_section": return this.THREE_SECTION()
          case "section": return this.SECTION()
          case "button": return this.BUTTON()
          case "image": return this.IMAGE()
          case "text": return this.TEXT()
          case "text_section": return this.TEXT_SECTION()
          case "form": return this.FORM()
          case "card": return this.CARD()
          case "divider": return this.DIVIDER()
          case "icon": return this.ICON()
        }
      },
      SECTION () {
         const _payload = {
          id: this.GET_RANDOM_ID(),
          title: "Section",
          name: "section",
          properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("section"),
          order: 1,
          hidden: false,
          childs: []
        }
        this.COMPONENT_TO_PAGE(_payload)
      },
      ONE_SECTION () {
        const _payload = {
          id: this.GET_RANDOM_ID(),
          title: "Section",
          name: "v-container",
          properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vContainer"),
          order: 1,
          hidden: false,
          childs: [
            {
              id: this.GET_RANDOM_ID(),
              title: "Reihe",
              name: "v-row",
              properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vRow"),
              order: 1,
              hidden: false,
              childs: [
                {
                  id: this.GET_RANDOM_ID(),
                  title: "Zeile",
                  name: "v-col",
                  properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vCol"),
                  order: 1,
                  hidden: false,
                  childs: []
                }
              ]
            }
          ]
        }
        this.COMPONENT_TO_PAGE(_payload)
      },
      TWO_SECTION () {
        const _payload = {
          id: this.GET_RANDOM_ID(),
          title: "Section",
          name: "v-container",
          properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vContainer"),
          order: 1,
          hidden: false,
          childs: [
            {
              id: this.GET_RANDOM_ID(),
              title: "Reihe",
              name: "v-row",
              properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vRow"),
              order: 1,
              hidden: false,
              childs: [
                {
                  id: this.GET_RANDOM_ID(),
                  title: "Zeile",
                  name: "v-col",
                  properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vCol", {cols: "6"}),
                  order: 1,
                  hidden: false,
                  childs: []
                },
                {
                  id: this.GET_RANDOM_ID(),
                  title: "Zeile",
                  name: "v-col",
                  properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vCol", {cols: "6"}),
                  order: 1,
                  hidden: false,
                  childs: []
                }
              ]
            }
          ]
        }
        this.COMPONENT_TO_PAGE(_payload)
      },
      THREE_SECTION () {
        const _payload = {
          id: this.GET_RANDOM_ID(),
          title: "Section",
          name: "v-container",
          properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vContainer"),
          order: 1,
          hidden: false,
          childs: [
            {
              id: this.GET_RANDOM_ID(),
              title: "Reihe",
              name: "v-row",
              properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vRow"),
              order: 1,
              hidden: false,
              childs: [
                {
                  id: this.GET_RANDOM_ID(),
                  title: "Zeile",
                  name: "v-col",
                  properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vCol", {cols: "4"}),
                  order: 1,
                  hidden: false,
                  childs: []
                },
                {
                  id: this.GET_RANDOM_ID(),
                  title: "Zeile",
                  name: "v-col",
                  properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vCol", {cols: "4"}),
                  order: 2,
                  hidden: false,
                  childs: []
                },
                 {
                  id: this.GET_RANDOM_ID(),
                  title: "Zeile",
                  name: "v-col",
                  properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vCol", {cols: "4"}),
                  order: 3,
                  hidden: false,
                  childs: []
                }
              ]
            }
          ]
        }
        this.COMPONENT_TO_PAGE(_payload)
      },
      BUTTON () {
        const _payload = {
          id: this.GET_RANDOM_ID(),
          title: "Button",
          name: "v-btn",
          properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vBtn"),
          order: 1,
          hidden: false,
          childs: [
            {
              id: this.GET_RANDOM_ID(),
              title: "Text",
              name: "v-text",
              properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vText"),
              content: "BUTTON TEXT",
              order: 1,
              hidden: false,
              childs: []
            }
          ]
        }
        this.COMPONENT_TO_PAGE(_payload)
      },
      IMAGE () {
        const _payload = {
          id: this.GET_RANDOM_ID(),
          title: "Bild",
          name: "v-img",
          properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vImg"),
          order: 1,
          hidden: false,
          childs: []
        }
        this.COMPONENT_TO_PAGE(_payload)
      },
      FORM () {
        const _payload = {
          id: this.GET_RANDOM_ID(),
          title: "Form",
          name: "mrx-form",
          properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("mrxForm"),
          content: "",
          order: 1,
          hidden: false,
          childs: []
        }
        this.COMPONENT_TO_PAGE(_payload)
      },
      CARD () {
        const _payload = {
          id: this.GET_RANDOM_ID(),
          title: "Card",
          name: "v-card",
          properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vCard"),
          content: "",
          order: 1,
          hidden: false,
          childs: []
        }
        this.COMPONENT_TO_PAGE(_payload)
      },
      TEXT () {
        const _payload = {
          id: this.GET_RANDOM_ID(),
          title: "TextSection",
          name: "v-text",
          properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vText"),
          content: "Text",
          order: 1,
          hidden: false,
          childs: []
        }
        this.COMPONENT_TO_PAGE(_payload)
      },
      TEXT_SECTION () {
        const _payload = {
          id: this.GET_RANDOM_ID(),
          title: "TextSection",
          name: "v-text-section",
          properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vTextSection"),
          content: `<h2>This is a Heading</h2>
          <p>This is <strong>strong</strong>. <!-- HardBreak--><br />
          This is <em>italic</em>. <!-- HardBreak--> <br />
          This is <u>underlined</u>.</p>

          <p>This is a next Paragraph.</p>`,
          order: 1,
          hidden: false,
          childs: []
        }
        this.COMPONENT_TO_PAGE(_payload)
      },
      DIVIDER () {
        const _payload = {
           id: this.GET_RANDOM_ID(),
          title: "Divider",
          name: "v-divider",
          properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vDivider"),
          content: "",
          order: 1,
          hidden: false,
          childs: []
        }
        this.COMPONENT_TO_PAGE(_payload)
      },
      ICON () {
        const _payload = {
          id: this.GET_RANDOM_ID(),
          title: "Icon",
          name: "v-icon",
          properties: this.GET_DEFAULT_PROPS_FOR_COMPONENT("vIcon"),
          content: "mdi-star-outline",
          order: 1,
          hidden: false,
          childs: []
        }
        this.COMPONENT_TO_PAGE(_payload)
      },
      GET_RANDOM_ID () {
        return Math.round(Math.random() * 99999)
      },
      GET_DEFAULT_PROPS_FOR_COMPONENT (name, overwrite) {
        const _s = settings[name].props
        let props = {}
        Object.keys(_s).forEach(key => {
          props[key] = _s[key].default
        })
        return JSON.stringify({
          ...props,
          ...overwrite
        })
      }
    }
  }
</script>

<style lang="scss">
  .xxl--icon{
    font-size: 42px !important;
  }
</style>
