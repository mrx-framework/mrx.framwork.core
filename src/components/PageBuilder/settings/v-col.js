export default {
  name: "Spalte",
  component: "v-col",
  icon: "mdi-view-column",
  groups: [
    ["Allgemein", "Eigenschaften"]
  ],
  props: {
    "align-self": {
      type: "Enum",
      default: undefined,
      values: [
        "start", "center", "end", "space-between", "space-around", "stretch"
      ],
      description: "Applies the align-items css property."
    },
    "cols": {
      type: "Enum",
      default: "12",
      values: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "auto"
      ],
      description: "Sets the default number of columns the component extends."
    },
    "sm": {
      type: "Enum",
      default: undefined,
      values: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "auto"
      ],
      description: "Sets the default number of columns the component extends."
    },
    "md": {
      type: "Enum",
      default: undefined,
      values: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "auto"
      ],
      description: "Changes the number of columns on medium and greater breakpoints."
    },
    "lg": {
      type: "Enum",
      default: undefined,
      values: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "auto"
      ],
      description: "Changes the number of columns on large and greater breakpoints."
    },
    "xl": {
      type: "Enum",
      default: undefined,
      values: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "auto"
      ],
      description: "Changes the number of columns on extra large and greater breakpoints."
    },
    "offset": {
      type: "Enum",
      default: undefined,
      values: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
      ],
      description: "Sets the default offset for the column."
    },
    "order": {
      type: "Enum",
      default: undefined,
      values: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
      ],
      description: "Sets the default order for the column."
    },
    tag: {
      type: "Enum",
      default: "div",
      values: [
        "div", "section"
      ],
      description: "Specify a custom tag used on the root element."
    }
  }
}

