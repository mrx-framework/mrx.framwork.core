<template>
  <v-app>
    <v-app-bar app dark class="blue-grey darken-3">
      <v-app-bar-nav-icon class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-md-and-up">
        <div class="logo d-flex align-center">
          <v-icon class="mr-3" color="light-blue accent-2">mdi-drag-variant</v-icon>
          <span class="text-uppercase font-weight-bold subheading">mrx.framework</span>
        </div>
      </v-toolbar-title>
      <v-spacer />
      <v-menu v-if="currentUser" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text dark v-on="on">
            {{ `${currentUser.firstname} ${currentUser.lastname}` }}
            <v-icon right x-small>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item @click="navigate('/local/logout', 'external')">
            <v-list-item-title>LogOut</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <AdminNavigation />
    <v-content style="padding-top: 64px;">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import gql from "graphql-tag"
  import api from "@/api"
  import currentUser from "@/mixins/currentUser"
  import AdminNavigation from "../components/AdminNavigation"

  export default {
    name: "AdminLayout",
    components: {
      AdminNavigation
    },
    mixins: [currentUser],
    methods: {
      navigate (path, type = "internal") {
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
