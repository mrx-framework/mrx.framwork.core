export default {
  name: "Divider",
  component: "v-divider",
  icon: "mdi-contain",
  props: {
    "dark": {
      type: "Boolean",
      default: false,
      description: "Applies the dark theme variant to the component. You can find more information on the Material Design documentation for dark themes."
    },
    "inset": {
      type: "Boolean",
      default: false,
      description: "Adds indentation (72px) for normal dividers, reduces max height for vertical.",
    },
    "light": {
      type: "Boolean",
      default: false,
      description: "Applies the light theme variant to the component."
    },
    "vertical": {
      type: "Boolean",
      default: false,
      description: "Displays dividers vertically."
    },
  }
}

