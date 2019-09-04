<template>
  <div>
    <v-treeview
      active.sync="active"
      active-class="light-blue--text text--accent-2"
      :items="items"
      item-children="childs"
      item-text="title"
      item-key="id"
      class="component--treeview"
      activatable
      hoverable
      @update:active="itemClicked"
      return-object
      dense>
      <template v-slot:append="{ item }">
        <div class="node--actions">
          <v-btn icon small @click.stop="EDIT_COMPONENT(item)">
            <v-icon small>mdi-brush</v-icon>
          </v-btn>
          <v-btn icon small @click.stop="">
            <v-icon small>mdi-plus</v-icon>
          </v-btn>
        </div>
      </template>
    </v-treeview>
    <v-divider />
    <v-btn block text>Hinzufügen</v-btn>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import settings from "../settings"
  import { camelCase } from "lodash"

  export default {
    name: "RecursiveComponentList",
    computed: {
      ...mapState("builder", ["activeComponent"]),
    },
    watch: {
      activeComponent: {
        handler(item) {
          if (item) {
            this.active = [item.id]
          }
        },
        immediate: true
      }
    },
    props: {
      items: {
        type: Array,
        default: () => []
      }
    },
    data: () => ({
      active: []
    }),
    methods: {
      itemClicked (item) {
        this.active = item
        this.$store.dispatch("builder/CHANGE_ACTIVE_COMPONENT", item[0])
      },
      EDIT_COMPONENT (item) {
        this.$store.dispatch("builder/CHANGE_ACTIVE_COMPONENT", item)
        this.$store.dispatch("builder/CHANGE_DRAWER_VIEW", 1)
      },
      GET_COMPONENT_NAME (name) {
        const componentName = camelCase(
          name.replace(/(\.\/|\.js)/g, "")
        )
        console.log(settings[componentName])
        return settings[componentName].name
      }
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
