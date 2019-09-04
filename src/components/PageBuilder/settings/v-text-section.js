export default {
  name: "TextSection",
  component: "v-text-section",
  icon: "mdi-contain",
  props: {
    "tag": {
      type: "String",
      default: "section",
      description: "Specify a custom tag used on the root element."
    }
  },
  content: {
    content: {
      type: "HTML",
      default: "<p>This is <strong>strong</strong.<br />This is <em>italic</em>.<br />This is <u>underlined</u>.</p>",
      description: "This is the innerHtml for the Component."
    }
  }
}

