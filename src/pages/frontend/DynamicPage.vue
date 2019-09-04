<template>
  <v-container
    v-if="page"
    fluid
    class="pa-0 ma-0"
    :class="{'fill-height': page.components.length === 0}"
    :style="{'margin-top': page.components.length === 0 ? '-64px !important' : 0}">
    <v-container fluid class="pa-0 ma-0" v-if="page.components.length > 0">
      <DisplayComponents
        v-for="component in page.components"
        :key="component.id"
        v-bind="component" />
    </v-container>
    <v-container v-else class="fill-height text-center align-center justify-center">
      <div>
        <h1 class="grey--text text--lighten-2 text-uppercase">{{ $t("placeholders.blank_page_header") }}</h1>
        <h2 class="grey--text text--lighten-3 text-uppercase">{{ $t("placeholders.blank_page_subheader") }}</h2>
      </div>
    </v-container>
  </v-container>
  <v-row v-else align="center" justify="center">
    <v-col cols="5" class="text-center" style="min-height: 200px;">
      <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
  import { displayPage } from "@/api/apollo/queries"
  export default {
    name: "DynamicPage",
    components: {
      DisplayComponents: () => import("@/components/PageBuilder/core/DisplayComponents"),
    },
    apollo: {
      page: {
        query: displayPage,
        variables () {
          const path = this.$route.fullPath
          return {
            path
          }
        },
        update: ({ displayPage }) => displayPage,
        fetchPolicy: "network-only"
      }
    },
    data: () => ({
      page: null
    })
  }
</script>
