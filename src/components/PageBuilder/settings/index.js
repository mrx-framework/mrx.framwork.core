import { camelCase } from "lodash"
const requireModule = require.context(".", false, /\.js$/)
const settings = {}


const general = {
  "class": {
    type: "String",
    default: undefined,
    description: "Applies classes to the component. Seperate with whitespace."
  },
  "style": {
    type: "String",
    default: undefined,
    description: "Applies inline-styles to the component. Seperate with semicolon."
  },
  "data-aos": {
    type: "String",
    default: undefined,
    description: "Use the Animate On Scroll class."
  }
}


requireModule.keys().forEach(fileName => {
  if (fileName === "./index.js") return
  const moduleName = camelCase(
    fileName.replace(/(\.\/|\.js)/g, "")
  )
  settings[moduleName] = requireModule(fileName).default
  settings[moduleName].general = general
})

export default settings
