export default {
  name: "Text",
  component: "v-text",
  icon: "mdi-contain",
  props: {
    "tag": {
      type: "String",
      default: "span",
      description: "Specify a custom tag used on the root element."
    },
  },
  content: {
    content: {
      type: "String",
      default: "Text",
      description: "This is the innerText for the Component."
    }
  }
}

