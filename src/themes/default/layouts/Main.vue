<template>
  <v-app>
    <v-content>
      <v-toolbar dark flat class="blue-grey darken-3">
        <v-container>
          <v-row align="center">
            <v-col cols="auto">
              <div>
                <v-icon class="mr-3" color="light-blue accent-2">mdi-drag-variant</v-icon>
                <span class="text-uppercase font-weight-bold subheading">mrx.framework</span>
              </div>
            </v-col>
            <v-spacer />
            <v-col class="text-right">
              <v-btn
                text
                v-for="item in navigation"
                :key="item.id"
                class="mr-2"
                :to="item.path">{{ item.text }}</v-btn>
              <v-btn text to="/admin">Admin</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-toolbar>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { displayNavigation } from "@/api/apollo/queries"
export default {
  name: "MainLayout",
  apollo: {
    navigation: {
      query: displayNavigation,
      variables: {
        location: "main-menu",
        parent: null
      },
      update: ({ displayNavigation }) => displayNavigation
    }
  },
  data: () => ({
    navigation: null
  }),
  methods: {
    navigate(path, type = "internal") {
      if (!path) return;
      if (type === "external") {
        window.location.href = path;
      } else {
        this.$router.push(path);
      }
    }
  }
};
</script>
