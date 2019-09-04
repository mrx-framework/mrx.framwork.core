export default {
  name: "Parallax",
  component: "v-parallax",
  icon: "mdi-eye",
  props: {
    "alt": {
      type: "String",
      default: undefined,
      description: "Attaches an alt property to the parallax image",
    },
    "height": {
      type: "Number",
      default: 500,
      description: "Sets the height for the component.",
    },
    "src": {
      type: "String",
      default: undefined,
      description: "The image to parallax",
    }
  }
}

