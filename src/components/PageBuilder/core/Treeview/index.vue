<template>
  <!-- this has bad performance: should be updated -->
  <ul class="mrx-treeview">
    <li v-for="item in data" :key="item.id">
      <v-row
        v-if="!hide"
        align="center"
        dense
        :class="{'selected': selectedComponent && selectedComponent.id === item.id}"
      >
        <v-col cols="auto">
          <template v-if="item.childs.length === 0">
            <v-btn icon small @click="SELECT_COMPONENT(item)">
              <v-icon small>mdi-chevron-double-right</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-btn icon small @click="TOGGLE_ITEM(item)">
              <v-icon small v-if="item.expanded">mdi-chevron-down</v-icon>
              <v-icon small v-else>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
        </v-col>
        <v-col cols="auto" class="mrx-treeview-content" @click="SELECT_COMPONENT(item)">
          <span v-text="item.title || item.name" />
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn icon small @click.stop="START_MOVING(item)" v-if="!moveEnabled">
            <v-icon small>mdi-arrow-all</v-icon>
          </v-btn>
          <v-btn
            icon
            small
            @click.stop="MOVE_INTO(item)"
            v-if="moveEnabled && componentToMove && componentToMove.id !== item.id"
          >
            <v-icon small>mdi-arrow-collapse-right</v-icon>
          </v-btn>
          <template v-if="moveEnabled && componentToMove && componentToMove.id === item.id">
            <v-btn icon small @click.stop="MOVE_UP(item)">
              <v-icon small>mdi-chevron-up</v-icon>
            </v-btn>
            <v-btn icon small @click.stop="MOVE_DOWN(item)">
              <v-icon small>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn icon small @click.stop="STOP_MOVING()">
              <v-icon small>mdi-check</v-icon>
            </v-btn>
          </template>
          <template v-if="!moveEnabled">
            <v-btn icon small @click.stop="EDIT_COMPONENT(item)">
              <v-icon small>mdi-brush</v-icon>
            </v-btn>
            <v-btn icon small @click.stop="REMOVE_COMPONENT(item)">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-col>
      </v-row>
      <TreeView
        v-show="item.expanded"
        :items="item.childs"
        :level="nextLevel"
        :moveEnabler="componentToMove"
        :moveDisabler="moveEnabled"
        @onExpandParent="EXPAND_PARENT"
        @onMoveEnabled="START_MOVING"
        @onMoveStop="STOP_MOVING"
      />
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    TreeView: () => import("./index.vue")
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 1
    },
    hide: {
      type: Boolean,
      default: false
    },
    moveEnabler: {
      type: [Object || null]
    }
  },
  computed: {
    ...mapGetters({
      components: "builder/PAGE_COMPONENTS",
      selectedComponent: "builder/SELECTED_COMPONENT"
    }),
    nextLevel() {
      return this.level + 1;
    },
    levelClass() {
      return `level--${this.level}`;
    }
  },
  watch: {
    components: {
      handler: "INIT",
      immediate: true
    },
    selectedComponent: {
      handler (component) {
        if (component) {
          this.EXPAND_PARENT(component.id);
        }
      },
      immediate: true
    },
    moveEnabler(component) {
      if (component) {
        this.componentToMove =
          Object.keys(component).length > 0 ? component : null;

        this.moveEnabled = Object.keys(component).length > 0 ? true : false;
      } else {
        this.componentToMove = null;
        this.moveEnabled = null;
      }
    },
    moveDisabler (bool) {
      if (!bool) {
        this.moveEnabled = false
      }
    }
  },
  data: () => ({
    data: null,
    moveEnabled: false,
    componentToMove: null,
    disableChilds: false
  }),
  methods: {
    INIT() {
      if (this.level === 1) {
        this.data = [
          {
            id: 0,
            name: "Root",
            title: "Root",
            expanded: true,
            moveToEnabled: false,
            childs: this.items.map(i => ({
              ...i,
              expanded: false,
              moveToEnabled: false
            }))
          }
        ];
      } else {
        this.data = this.items.map(i => ({
          ...i,
          expanded: false
        }));
      }
    },
    TOGGLE_ITEM(item) {
      item.expanded = !item.expanded;
    },
    SELECT_COMPONENT(item) {
      this.$store.dispatch("builder/CHANGE_SELECTED_COMPONENT_ID", item.id);
    },
    EXPAND_PARENT(childId) {
      this.data.forEach(item => {
        if (item.childs.findIndex(i => i.id === childId) > -1) {
          item.expanded = true;
          this.$emit("onExpandParent", item.id);
        }
      });
    },
    EDIT_COMPONENT(component) {
      this.$store.dispatch(
        "builder/CHANGE_SELECTED_COMPONENT_ID",
        component.id
      );
      this.$store.dispatch("builder/CHANGE_DRAWER_VIEW", 1);
    },
    REMOVE_COMPONENT(component) {
      this.$store.dispatch("builder/REMOVE_COMPONENT", component);
    },
    START_MOVING(component) {
      this.disableChilds = true;
      this.moveEnabled = true;
      this.componentToMove = component;
      this.$emit("onMoveEnabled", component);
    },
    MOVE_INTO(component) {
      this.moveEnabled = false;
      const payload = {
        from: this.componentToMove,
        to: component
      };
      this.$store.dispatch("builder/MOVE_COMPONENT", payload);
      this.$emit("onMoveStop");
    },
    STOP_MOVING() {
      this.moveEnabled = false;
      this.componentToMove = null;
      this.$emit("onMoveStop");
    },
    MOVE_UP(component) {
       this.$store.dispatch("builder/MOVE_UP", component)
    },
    MOVE_DOWN(component) {
       this.$store.dispatch("builder/MOVE_DOWN", component)
    }
  },
  mounted() {
    if (this.selectedComponent) {
      this.EXPAND_PARENT(this.selectedComponent.id);
    }
  }
};
</script>

<style lang="scss">
ul.mrx-treeview {
  list-style-type: none;
  color: white;
  padding-left: 0px;

  .selected {
    background: rgba(64, 196, 255, 0.24);
    color: #40c4ff;
  }

  .row {
    margin-right: 0px;
    margin-left: 0px;
  }

  .mrx-treeview-content {
    cursor: pointer;
  }

  & > li > ul {
    padding-left: 8px;
  }
  &.nav-hidden {
    display: none;
  }
}
</style>
