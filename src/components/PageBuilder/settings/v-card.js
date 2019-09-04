export default {
  name: "Zeile",
  component: "v-row",
  icon: "mdi-view-agenda",
  props: {
    "active-class": {
      type: "String",
      default: undefined,
      description: "Configure the active CSS class applied when the link is active. You can find more information about the active-class prop on the vue-router documentation."
    },
    "append": {
      type: "Boolean",
      default: false,
      description: "Setting append prop always appends the relative path to the current path. You can find more information about the append prop on the vue-router documentation."
    },
    "color": {
      type: "String",
      default: undefined,
      description: "Applies specified color to the control - it can be the name of material color (for example success or purple) or css color (#033 or rgba(255, 0, 0, 0.5)). You can find list of built in classes on the colors page."
    },
    "dark": {
      type: "Boolean",
      default: false,
      description: "Applies the dark theme variant to the component. You can find more information on the Material Design documentation for dark themes."
    },
    "disabled": {
      type: "Boolean",
      default: false,
      description: "Removes the ability to click or target the component."
    },
    "elevation": {
      type: "Number",
      default: 0,
      min: 0,
      max: 24,
      description: "Designates an elevation applied to the component between 0 and 24. You can find more information on the elevation page."
    },
    "exact": {
      type: "Boolean",
      default: false,
      description: "Exactly match the link. Without this, '/' will match every route. You can find more information about the exact prop on the vue-router documentation."
    },
    "exact-active-class": {
      type: "String",
      default: undefined,
      description: "Configure the active CSS class applied when the link is active with exact match. You can find more information about the exact-active-class prop on the vue-router documentation."
    },
    "flat": {
      type: "Boolean",
      default: false,
      description: "Removes the card's elevation."
    },
    "height": {
      type: "Number",
      default: undefined,
      description: "Sets the height for the component."
    },
    "hover": {
      type: "Boolean",
      default: false,
      description: "Will apply an elevation of 4dp when hovered (default 2dp). You can find more information on the elevation page."
    },
    "href": {
      type: "String",
      default: undefined,
      description: "Designates the component as anchor and applies the href attribute."
    },
    "img": {
      type: "String",
      default: undefined,
      description: "Specifies an image background for the card. For more advanced implementations, it is recommended that you use the v-img component."
    },
    "light": {
      type: "Boolean",
      default: false,
      description: "Applies the light theme variant to the component."
    },
    "link": {
      type: "Boolean",
      default: false,
      description: "Designates that the component is a link. This is automatic when using the href or to prop."
    },
    "loader-height": {
      type: "Number",
      default: undefined,
      description: "Specifies the height of the loader"
    },
    "loading": {
      type: "Boolean",
      default: false,
      description: "Displays linear progress bar. Can either be a String which specifies which color is applied to the progress bar (any material color or theme color - primary, secondary, success, info, warning, error) or a Boolean which uses the component color (set by color prop - if it's supported by the component) or the primary color."
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
    "outlined": {
      type: "Boolean",
      default: false,
      description: "Makes the background transparent and applies a thin border."
    },
    "replace": {
      type: "Boolean",
      default: false,
      description: "Setting replace prop will call router.replace() instead of router.push() when clicked, so the navigation will not leave a history record. You can find more information about the replace prop on the vue-router documentation."
    },
    "ripple": {
      type: "Boolean",
      default: false,
      description: "Applies the v-ripple directive."
    },
    "tag": {
      type: "Enum",
      default: "div",
      values: [
        "div", "section"
      ],
      description: "Specify a custom tag used on the root element."
    },
    "target": {
      type: "String",
      default: undefined,
      description: "Designates the target attribute. This should only be applied when using the href prop."
    },
    "tile": {
      type: "Boolean",
      default: false,
      description: "Removes the component's border-radius."
    },
    "to": {
      type: "String",
      default: undefined,
      description: "Denotes the target route of the link. You can find more information about the to prop on the vue-router documentation."
    },
    "width": {
      type: "Number",
      default: undefined,
      description: "Sets the minimum width for the component."
    },
  }
}

