<template>
  <v-app-bar dense flat app dark class="blue-grey darken-3">
    <v-toolbar-items>
      <v-btn icon :class="screenSize === 0 ? 'v-btn--active' : ''" @click="CHANGE_SCREEN_SIZE(0)">
        <v-icon>mdi-monitor</v-icon>
      </v-btn>
      <v-btn icon :class="screenSize === 1 ? 'v-btn--active' : ''" @click="CHANGE_SCREEN_SIZE(1)">
        <v-icon>mdi-tablet</v-icon>
      </v-btn>
      <v-btn icon :class="screenSize === 2 ? 'v-btn--active' : ''" @click="CHANGE_SCREEN_SIZE(2)">
        <v-icon>mdi-cellphone-android</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items>
      <v-btn icon @click="CHANGES_UNDO">
        <v-icon :disabled="!undoActive">mdi-undo-variant</v-icon>
      </v-btn>
      <v-btn icon @click="CHANGES_REDO">
        <v-icon :disabled="!redoActive">mdi-redo-variant</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items>
      <v-btn :disabled="!saveActive" icon @click="SAVE_PAGE">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "BuilderToolbar",
    computed: {
      ...mapState("builder", ["screenSize", "versions", "version"]),
      undoActive () {
        return this.version > 1
      },
      redoActive () {
        return this.version < (this.versions.length)
      },
      saveActive () {
        return this.version > 1
      }
    },
    methods: {
      ...mapActions({
        CHANGE_SCREEN_SIZE: "builder/CHANGE_SCREEN_SIZE"
      }),
      CHANGES_UNDO() {
        this.$store.dispatch("builder/UNDO_VERSION")
      },
      CHANGES_REDO() {
         this.$store.dispatch("builder/REDO_VERSION")
      },
      SAVE_PAGE () {
        this.$emit("onSavePage")
      }
    }
  }
</script>
