<template>
  <div id="app">
    <component :is="layout" v-if="!$apollo.loading">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </component>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: 'App',
    metaInfo: {
      title: 'App',
      titleTemplate: '%s | My Awesome Webapp',
      meta: [
        { charset: 'utf-8' },
        { name: 'description', content: 'My Awesome Webapp'},
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ]
    },
    components: {
      'blank-layout': () => import('./layouts/Blank'),
      'admin-layout': () => import('./layouts/Admin'),
      'main-layout' : () => import('./layouts/Main'),
      'builder-layout': () => import('./layouts/Builder'),
    },
    apollo: {
      theme: {
        prefetch: true,
        query: gql`query getSettings($key: String!) {
          settings(key: $key) {
            key
            value
          }
        }`,
        variables: {
          key: 'theme_color'
        },
        update: function (data) {
          /*
          const { settings } = data
          Object.keys(this.$vuetify.theme.theme[this.$vuetify.theme.isDark ? 'dark' : 'light']).forEach(key => {
            this.$vuetify.theme[key] = settings.find(s => s.key === `theme_color_${key}`).value
          })
          this.$vuetify.theme.dark = false
          let theme = {}
          settings.forEach(s => theme[s.key] = s.value)
          return theme
          */
        }
      }
    },
    data: () => ({
      theme: null
    }),
    computed: {
      layout () {
        return (this.$route.meta.layout || 'main') + '-layout'
      }
    }
  }
</script>

<style lang="scss">
  @import './style/style.scss';
</style>
