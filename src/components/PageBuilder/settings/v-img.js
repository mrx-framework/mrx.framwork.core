export default {
  name: "Bild",
  component: "v-img",
  icon: "mdi-image-outline",
  props: {
    "alt": {
      type: "String",
      default: undefined,
      description: "Alternate text for screen readers. Leave empty for decorative images.",
    },
    "aspect-ratio": {
      type: "Number",
      default: undefined,
      description: "Calculated as width/height, so for a 1920x1080px image this will be 1.7778. Will be calculated automatically if omitted."
    },
    "contain": {
      type: "Boolean",
      default: false,
      description: "Prevents the image from being cropped if it doesn't fit"
    },
    "gradient": {
      type: "String",
      default: undefined,
      description: "Overlays a gradient onto the image. Only supports linear-gradient syntax, anything else should be done with classes (see examples)",
    },
    "height": {
      type: "Number",
      default: undefined,
      description: "Sets the height for the component."
    },
    "lazy-src": {
      type: "Media",
      default: "https://via.placeholder.com/1920x500",
      description: "Something to show while waiting for the main image to load, typically a small base64-encoded thumbnail. Has a slight blur filter applied.",
    },
    "max-height": {
      type: "Number",
      default: undefined,
      description: "Sets the maximum height for the component."
    },
    "max-width": {
      type: "Number",
      default: undefined,
      description: "Sets the maximum width for the component."
    },
    "min-height": {
      type: "Number",
      default: undefined,
      description: "Sets the minimum height for the component."
    },
    "min-width": {
      type: "Number",
      default: undefined,
      description: "Sets the minimum width for the component."
    },
    "position": {
      type: "String",
      default: "center center",
      description: "Overrides the default to change which parts get cropped off. Uses the same syntax as background-position.",
    },
    "src": {
      type: "Media",
      default: "https://via.placeholder.com/1920x500",
      description: "The image URL. This prop is mandatory",
    },
    "transition": {
      type: "String",
      default: "fade-transition",
      description: "The transition to use when switching from lazy-src to src",
    },
    "width": {
      type: "Number",
      default: undefined,
      description: "Sets the width for the component."
    }
  }
}

