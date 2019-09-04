<template>
  <v-navigation-drawer app dark floating right width="400" class="blue-grey darken-4">
    <v-app-bar dense class="blue-grey darken-3">
      <v-toolbar-items class="mr-3">
         <v-btn icon :class="drawerView === 0 ? 'v-btn--active' : ''" @click="CHANGE_DRAWER_VIEW(0)">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-btn icon :class="drawerView === 1 ? 'v-btn--active' : ''" @click="CHANGE_DRAWER_VIEW(1)" :disabled="!selectedComponent">
          <v-icon>mdi-brush</v-icon>
        </v-btn>
        <v-btn icon :class="drawerView === 2 ? 'v-btn--active' : ''" @click="CHANGE_DRAWER_VIEW(2)">
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items>
        <v-btn icon to="/admin/pages" exact>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <perfect-scrollbar class="scroll-container" :options="scrollSettings">
      <template v-if="drawerView === 0">
        <ComponentList :items="components" />
      </template>
      <template v-if="drawerView === 1">
        <ComponentSettings
          @SELECT_MEDIA_FOR_COMPONENT="SELECT_MEDIA_FOR_COMPONENT"
          @EDIT_HTML_CONTENT_FOR_COMPONENT="EDIT_HTML_CONTENT_FOR_COMPONENT" />
      </template>
      <template v-if="drawerView === 2">
        <ComponentSelector />
      </template>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions,mapGetters } from "vuex";

export default {
  name: "BuilderRightDrawer",
  components: {
    ComponentList: () => import("../core/Treeview/index.vue"),
    ComponentSettings: () => import("../core/ComponentSettings"),
    ComponentSelector: () => import("../core/ComponentSelector")
  },
  computed: {
    ...mapState("builder", ["drawerView"]),
    ...mapGetters({
      components: "builder/PAGE_COMPONENTS",
      selectedComponent: "builder/SELECTED_COMPONENT"
    })
  },
  data: () => ({
    scrollSettings: {
      wheelPropagation: false
    }
  }),
  methods: {
    ...mapActions({
      CHANGE_DRAWER_VIEW: "builder/CHANGE_DRAWER_VIEW"
    }),
    SELECT_MEDIA_FOR_COMPONENT (payload) {
      this.$emit("SELECT_MEDIA_FOR_COMPONENT", payload)
    },
    EDIT_HTML_CONTENT_FOR_COMPONENT (payload) {
      this.$emit("EDIT_HTML_CONTENT_FOR_COMPONENT", payload)
    }
  }
};
</script>

<style lang="scss">
  .scroll-container {
    height: calc(100vh - 48px);
    overflow: hidden;
    .ps__rail-y {
      z-index: 999;
    }
  }
</style>
