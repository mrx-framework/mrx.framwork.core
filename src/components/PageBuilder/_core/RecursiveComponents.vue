<template>
  <component
    v-if="content"
    :is="name"
    v-html="content"
    v-bind="componentProperties"
    />
  <component
    v-else
    :is="name"
    v-bind="componentProperties">
    <Recursive
      v-for="child in childs"
      :key="child.id"
      :name="child.name"
      :id="child.id"
      :properties="child.properties"
      :childs="child.childs"
      :content="child.content">
    </Recursive>
  </component>
</template>

<script>
  import {  mapGetters, mapState } from "vuex"
  export default {
    name: "RecursiveComponents",
    components: {
      Recursive: () => import("./RecursiveComponents")
    },
    props: {
      editMode: {
        type: Boolean,
        default: false
      },
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String
      },
      properties: {
        type: String
      },
      childs: {
        type: Array,
        default: () => []
      },
      content: {
        type: String,
      },
      hidden: {
        type: String
      }
    },
    computed: {
      ...mapState("builder", ["selectedComponentId"]),
      ...mapGetters({
        selectedComponent: "builder/SELECTED_COMPONENT"
      }),
      isActiveComponent () {
        if (!this.selectedComponentId) return
        return this.id === this.selectedComponentId
      },
      componentProperties () {
        let object = JSON.parse(this.properties)

        if (this.isActiveComponent) {
          object = JSON.parse(this.selectedComponent.properties)
          const classes = object["class"] ? object["class"].split(" ") : []
          classes.push("activated--component")
          object["class"] = classes.join(" ")
          console.log(object.class)
        }
        return object
      }
    }
  }
</script>

<style lang="scss">
  .activated--component {
    border: 1px dotted #039BE5 !important;
    //background: rgba(0,0,0,0.05) !important;
  }
</style>
