export default {
  name: "Container",
  component: "v-container",
  icon: "mdi-contain",
  props: {
    "fluid": {
      type: "Boolean",
      default: false,
      description: "Removes viewport maximum-width size breakpoints"
    },
    "id": {
      type: "String",
      default: undefined,
      description: "Sets the DOM id on the component",
    },
    "tag": {
      type: "Enum",
      default: "div",
      values: [
        "div", "section"
      ],
      description: "Specify a custom tag used on the root element."
    }
  }
}

