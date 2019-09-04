import Vue from "vue"
import VueI18n from "vue-i18n"
import config from "../../config"

Vue.use(VueI18n)

export const loadLocaleMessages = () => {
  const locales = require.context("../locales", true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export const createI18n = () => {
  return new VueI18n({
    locale: config.locale || "en",
    fallbackLocale: "en",
    messages: loadLocaleMessages()
  })
}
