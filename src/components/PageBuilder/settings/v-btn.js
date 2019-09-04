export default {
  name: "Button",
  component: "v-btn",
  icon: "mdi-view-column",
  props: {
    "absolute": {
      type: "Boolean",
      default: false,
      description: "Applies position: absolute to the component."
    },
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
    "block": {
      type: "Boolean",
      default: false,
      description: "Expands the button to 100% of available space."
    },
    "bottom": {
      type: "Boolean",
      default: false,
      description: "Aligns the component towards the bottom."
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
    "depressed": {
      type: "Boolean",
      default: false,
      description: "Removes the button box shadow."
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
    "fab": {
      type: "Boolean",
      default: false,
      description: "Designates the button as a floating-action-button - round."
    },
    "fixed": {
      type: "Boolean",
      default: false,
      description: "Applies position: fixed to the component."
    },
    "height": {
      type: "Number",
      default: undefined,
      description: "Sets the height for the component."
    },
    "href": {
      type: "String",
      default: undefined,
      description: "Designates the component as anchor and applies the href attribute."
    },
    "icon": {
      type: "Boolean",
      default: false,
      description: "Designates the button as icon - round and flat"
    },
    "large": {
      type: "Boolean",
      default: false,
      description: "Makes the component large."
    },
    "left": {
      type: "Boolean",
      default: false,
      description: "Aligns the component towards the left. This should be used with the absolute or fixed props."
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
    "loading": {
      type: "Boolean",
      default: false,
      description: "Adds a loading icon animation"
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
    "right": {
      type: "Boolean",
      default: false,
      description: "Aligns the component towards the right. This should be used with the absolute or fixed props."
    },
    "rounded": {
      type: "Boolean",
      default: false,
      description: "Applies a large border radius on the button."
    },
    "small": {
      type: "Boolean",
      default: false,
      description: "Makes the component small."
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
    "text": {
      type: "Boolean",
      default: false,
      description: "Makes the background transparent."
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
    "top": {
      type: "Boolean",
      default: false,
      description: "Aligns the content towards the top."
    },
    "type": {
      type: "String",
      default: undefined,
      description: "Set the button's type attribute"
    },
    "width": {
      type: "Number",
      default: undefined,
      description: "Sets the width for the component."
    },
    "x-large": {
      type: "Boolean",
      default: false,
      description: "Makes the component extra large."
    },
    "x-small": {
      type: "Boolean",
      default: false,
      description: "Makes the component extra small."
    },
  }
}

