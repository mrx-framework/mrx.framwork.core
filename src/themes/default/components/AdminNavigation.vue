<template>
   <v-navigation-drawer
      app
      dark
      floating
      left
      class="blue-grey darken-4">
      <v-app-bar
        flat
        class="blue-grey darken-3 hidden-sm-and-down">
        <div class="logo d-flex align-center">
          <v-icon class="mr-3" color="light-blue accent-2">mdi-drag-variant</v-icon>
          <span class="text-uppercase font-weight-bold subheading">mrx.framework</span>
        </div>
      </v-app-bar>
      <v-list class="py-0">
        <template v-for="item in navigation">
          <template v-if="item.childs.length === 0">
            <v-list-item
              active-class="light-blue--text text--accent-2"
              :key="item.id"
              :to="item.path"
              exact>
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text" />
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-group :key="item.id" :prepend-icon="item.icon" no-action @click="navigate(item.path)">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="item in item.childs"
                :key="item.id"
                :to="item.path"
                exact>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  import { displayNavigation } from "@/api/apollo/queries"

  export default {
    name: "AdminNavigation",
    apollo: {
      navigation: {
        query: displayNavigation,
        variables: {
          location: "admin-menu",
          parent: null
        },
        update: ({ displayNavigation }) => displayNavigation
      }
    },
    data: () => ({
      navigation: null
    }),
    methods: {
      navigate (path, type = "internal") {
        if (!path) return
        if (type === "external") {
          window.location.href = path
        }
        else {
          this.$router.push(path)
        }
      }
    }
  }
</script>


<style lang="scss">
  .v-list-group--active {
    background-color: #37474F;
  }
  .v-list__tile--active,
  .v-list-group--active {
    .v-icon,
    .v-list-item {
      color: #40c4ff !important;
      caret-color: #40c4ff !important;
    }
  }
</style>
