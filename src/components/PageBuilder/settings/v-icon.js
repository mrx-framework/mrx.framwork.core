export default {
  name: "Icon",
  component: "v-icon",
  icon: "mdi-contain",
  props: {
    "color": {
      type: "String",
      default: undefined,
      description: "Applies specified color to the control - it can be the name of material color (for example success or purple) or css color (#033 or rgba(255, 0, 0, 0.5)). You can find list of built in classes on the colors page."
    },
    "dark": {
      type: "Boolean",
      default: false,
      description: "Applies the dark theme variant to the component. You can find more information on the Material Design documentation for dark themes.",
    },
    "dense": {
      type: "Boolean",
      default: false,
      description: "Makes icon smaller (20px)"
    },
    "large": {
      type: "Boolean",
      default: false,
      description: "Makes the icon large."
    },
    "left": {
      type: "Boolean",
      default: false,
      description: "Places the icon on the left, when used inside a button."
    },
    "light": {
      type: "Boolean",
      default: false,
      description: "Applies the light theme variant to the component."
    },
    "right": {
      type: "Boolean",
      default: false,
      description: "Places the icon on the right, when used inside a button."
    },
    "size": {
      type: "Number",
      default: undefined,
      description: "Specifies a custom font size for the icon."
    },
    "small": {
      type: "Boolean",
      default: false,
      description: "Makes the icon small."
    },
    "tag": {
      type: "String",
      default: "i",
      description: "Specifies a custom tag to be used."
    },
    "x-large": {
      type: "Boolean",
      default: false,
      description: "Makes the icon extra large."
    },
    "x-small": {
      type: "Boolean",
      default: false,
      description: "Makes the icon extra small."
    },
  },
  content: {
    content: {
      type: "String",
      default: "mdi-star-outline",
      description: "The code for the material design icon. https://cdn.materialdesignicons.com/4.2.95/"
    }
  }
}

