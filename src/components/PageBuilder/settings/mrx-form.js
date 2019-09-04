import { getDefinitionForQuery } from "@/api/apollo/definitions"

export default {
  name: "Form",
  component: "mrx-form",
  icon: "mdi-card-bulleted-outline",
  props: {
    "formObject": {
      type: "Lookup",
      definition: getDefinitionForQuery("forms"),
      default: {
        id: -1,
        name: ""
      },
      description: "Choose formular you want to display."
    },
    "show-title": {
      type: "Boolean",
      default: true,
      description: "If enabled, the name of the formular will be shown at the top."
    },
    "button-text": {
      type: "String",
      default: "Absenden",
      description: "The text shown on the submit button."
    },
    "lazy-validation": {
      type: "Boolean",
      default: false,
      description: "If enabled, value will always be true unless there are visible validation errors. You can still call validate() to manually trigger validation"
    }
  }
}

