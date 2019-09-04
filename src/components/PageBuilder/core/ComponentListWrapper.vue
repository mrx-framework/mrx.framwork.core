<template>
  <!-- THIS SHIT HAS TO BE REWRITTEN COMPLEEEEEEEEEEETLY NEW -->
  <v-treeview
    :active="active"
    activatable
    active-class="light-blue--text text--accent-2"
    :open="open"
    :items="items"
    item-children="childs"
    item-text="id"
    item-key="id"
    class="component--treeview"
    hoverable
    return-object
    dense>
    <template v-slot:label="{item}">
      <div @click="SELECT_COMPONENT(item)" style="height: 40px; line-height:40px;">
        {{ item.title || item.name }}
      </div>
    </template>
    <template v-slot:append="{ item }">
      <div>
        <div class="node--childs" v-if="item.childs.length > 0">
           <v-chip x-small>{{ item.childs.length }}</v-chip>
        </div>
        <div class="node--actions">
          <v-btn icon small @click.stop="MOVE_COMPONENT(item)" v-if="!moveEnabled && item.id !== 0">
            <v-icon small>mdi-arrow-all</v-icon>
          </v-btn>
          <v-btn icon small @click.stop="MOVE_TO_COMPONENT(item)" v-if="moveEnabled" :disabled="!item.moveEnabled">
            <v-icon small>mdi-arrow-collapse-right</v-icon>
          </v-btn>
          <template v-if="moveEnabled && movingComponent && movingComponent.id === item.id">
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
          <template v-if="item.id !== 0 && !moveEnabled">
            <v-btn icon small @click.stop="EDIT_COMPONENT(item)">
              <v-icon small>mdi-brush</v-icon>
            </v-btn>
            <v-btn icon small @click.stop="REMOVE_COMPONENT(item)">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>
        </div>
      </div>
    </template>
  </v-treeview>
</template>

<script>
  import { mapGetters, mapState } from "vuex"
  export default {
    name: "ComponentListWrapper",
    computed: {
      ...mapState("builder", ["selectedComponentId", "breadCrumb"]),
      ...mapGetters({
        components: "builder/PAGE_COMPONENTS",
        selectedComponent: "builder/SELECTED_COMPONENT"
      }),
      items () {
        const childs = this.components.map(c => ({
          ...c,
          moveEnabled: true
        }))
        return [{
          id: 0,
          name: "Root",
          title: "Root",
          moveEnabled: true,
          childs
        }]
      }
    },
    data: () => ({
      open: [{id: 0}],
      active: [],
      moveEnabled: false,
      movingComponent: null
    }),
    watch: {
      selectedComponent: {
        handler: "SET_ACTIVE",
      }
    },
    methods: {
      SELECT_COMPONENT(item) {
         this.$store.dispatch("builder/CHANGE_SELECTED_COMPONENT_ID", item.id);
      },
      UPDATE_ACTIVE (item) {
        console.log("UPDATE_ACTIVE_TREEVIEW")
        if (item.length) {
          this.open = [{id: 0}]
          this.SET_OPEN(this.breadCrumb)
        } else {
          this.SET_ACTIVE()
        }
      },
      EDIT_COMPONENT (component) {
        this.$store.dispatch("builder/CHANGE_SELECTED_COMPONENT_ID", component.id);
        this.$store.dispatch("builder/CHANGE_DRAWER_VIEW", 1);
      },
      REMOVE_COMPONENT (component) {
        this.$store.dispatch("builder/REMOVE_COMPONENT", component)
      },
      MOVE_COMPONENT (component) {
        this.RECURSIVE_DISABLE_MOVE_TO(component.childs)
        this.movingComponent = component
        this.moveEnabled = true
      },
      MOVE_UP (component) {
        this.$store.dispatch("builder/MOVE_UP", component)
      },
      MOVE_DOWN (component) {
        this.$store.dispatch("builder/MOVE_DOWN", component)
      },
      STOP_MOVING() {
        this.movingComponent = null
        this.moveEnabled = false
      },
      RECURSIVE_DISABLE_MOVE_TO ( items ) {
        for (let i = 0; i < items.length; i++) {
          let item = items[i]
          item.moveEnabled = false
          if (item.childs.length > 0) {
            this.RECURSIVE_DISABLE_MOVE_TO(item.childs)
          }
        }
      },
      MOVE_TO_COMPONENT (component) {
        this.moveEnabled = false
        const payload = {
          from: this.movingComponent,
          to: component
        }
        this.$store.dispatch("builder/MOVE_COMPONENT", payload)
      },
      SET_OPEN ( breadcrumb ) {
        if (!breadcrumb) return
        this.open.push(breadcrumb.active)
        if (breadcrumb.child) {
          this.SET_OPEN(breadcrumb.child)
        }
      },
      SET_ACTIVE () {
        this.SET_OPEN(this.breadCrumb)
        this.active = this.selectedComponent ? [this.selectedComponent] : []
      },
      DRAG_START (item, event) {
        console.log(item)
      }
    },
    mounted () {
      this.SET_OPEN(this.breadCrumb)
      this.SET_ACTIVE()
    }
  }
</script>

<style lang="scss">
  .component--treeview {
    .v-treeview-node {
      cursor: pointer;
      .v-treeview-node__content {
          .node--actions {
            display: none;
          }
          &:hover {
            .node--actions {
              display: block;
            }
            .node--childs {
              display: none;
            }
          }
      }

    }
    .v-treeview-node__children {
      .v-treeview-node {
        margin-left: 15px;
      }
    }
  }

</style>
