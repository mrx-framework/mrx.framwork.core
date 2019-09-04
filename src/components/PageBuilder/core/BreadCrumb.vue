<template>
  <v-layout align-center>
    <v-btn
      small
      depressed
      v-if="siblings.length === 0"
      @click="SELECT_COMPONENT(currentComponent)"
      active-class="no-action"
    >{{ active.title || active.name }}</v-btn>
    <v-menu v-else offset-y>
      <template v-slot:activator="{ on }">
        <v-btn-toggle>
          <v-btn
            small
            depressed
            @click="SELECT_COMPONENT(currentComponent)"
            active-class="no-action"
          >{{ active.title || active.name }}</v-btn>
          <v-btn small depressed class="px-0" width="20" v-on="on" active-class="no-action">
            <v-icon small>mdi-chevron-down</v-icon>
          </v-btn>
        </v-btn-toggle>
      </template>
      <v-list dense class="py-0">
        <v-list-item
          v-for="component in siblings"
          :key="component.id"
          @click="SELECT_COMPONENT(component)"
        >
          <v-list-item-title>{{ component.title || component.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <span v-if="child" class="mx-2">
      <v-icon>mdi-chevron-right</v-icon>
    </span>
    <RecursiveBreadcrumb v-if="child" v-bind="child" :level="nextLevel" />
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import componentSelectors from "../mixins/componentSelectors";
export default {
  name: "BuilderBreadcrumb",
  //mixins: [componentSelectors],
  components: {
    RecursiveBreadcrumb: () => import("./BreadCrumb")
  },
  computed: {
    ...mapGetters({
      selectedComponent: "builder/SELECTED_COMPONENT"
    }),
    currentComponent() {
      return this.active;
    },
    nextLevel () {
      return this.level + 1
    }
  },
  props: {
    active: {
      type: Object,
      default: () => {}
    },
    child: {
      type: Object,
      default: () => {}
    },
    siblings: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 1
    }
  },
  methods: {
    SELECT_COMPONENT(component) {
      this.$store.dispatch(
        "builder/CHANGE_SELECTED_COMPONENT_ID",
        component.id
      );
    }
  }
};
</script>
