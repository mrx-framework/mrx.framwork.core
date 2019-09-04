export default {
  name: "Zeile",
  component: "v-row",
  icon: "mdi-view-agenda",
  props: {
    "align": {
      type: "Enum",
      default: undefined,
      values: [
        "start", "center", "end", "space-between", "space-around", "stretch"
      ],
      description: "Applies the align-items css property."
    },
    "align-content": {
      type: "Enum",
      default: undefined,
      values: [
        "start", "center", "end", "space-between", "space-around", "stretch"
      ],
      description: "Applies the align-content css property."
    },
    "justify": {
      type: "Enum",
      default: undefined,
      values: [
        "start", "center", "end", "space-between", "space-around", "stretch"
      ],
      description: "Applies the justify-content css property."
    },
    "dense": {
      type: "Boolean",
      default: false,
      description: "Reduces the gutter between v-cols."
    },
    "no-gutters": {
      type: "Boolean",
      default: false,
      description: "Removes the gutter between v-cols."
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

