<template>
  <v-app>
    <Toolbar @onSavePage="OPEN_SAVE_DIALOG" />
    <RightDrawer
      @SELECT_MEDIA_FOR_COMPONENT="SELECT_MEDIA_FOR_COMPONENT"
      @EDIT_HTML_CONTENT_FOR_COMPONENT="EDIT_HTML_CONTENT_FOR_COMPONENT" />
    <v-content class="tranparent__pattern">
      <v-toolbar dense color="white" style="position: fixed; width: 100%; z-index: 5;">
        <div>
          <v-layout align-center>
            <v-btn
              small
              depressed
              @click="$store.dispatch('builder/CHANGE_SELECTED_COMPONENT_ID', 0)"
            >Root</v-btn>
            <span v-if="breadCrumb" class="mx-2">
              <v-icon>mdi-chevron-right</v-icon>
            </span>
            <BreadCrumb v-if="breadCrumb" v-bind="breadCrumb" />
          </v-layout>
        </div>
      </v-toolbar>
      <v-container fluid style="margin-top: 45px;">

        <v-row
          justify="center"
          v-if="currentPage && currentPage.components && currentPage.components.length"
        >
          <v-col v-bind="containerBinds" class="white">
            <DisplayComponents
              v-for="component in currentPage.components"
              :key="component.id"
              v-bind="component"
              editMode
            />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer app dark inset max-height="35">
      <v-row no-gutter class="py-0 caption">
        <v-col cols="10" class="py-0"></v-col>
        <v-col cols="2" class="py-0 text-right">Changes: {{version - 1}}</v-col>
      </v-row>
    </v-footer>
    <v-dialog v-model="saveDialog" width="800">
      <v-card tile>
        <v-card-title class="primary title white--text">Speichern</v-card-title>
        <v-card-text>
          <v-form v-if="page">
            <v-row>
              <v-col cols="8">
                <v-text-field label="Title" v-model="page.title" hide-details />
              </v-col>
              <v-col cols="4">
                <v-text-field label="Slug"  v-model="page.slug" hide-details />
              </v-col>
              <v-col cols="12">
                <v-text-field label="Pfad"  v-model="page.path" hide-details />
              </v-col>
              <v-col cols="12">
                <v-switch label="Veröffentlichen" hide-details v-model="publish"/>
              </v-col>
              <template v-if="publish">
                <v-col cols="6">
                  <v-text-field
                    type="date"
                    label="Publishing Date"
                    v-model="publishDate"
                    append-icon="mdi-calendar" />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    type="time"
                    label="Publishing Time"
                    v-model="publishTime"
                    readonly
                    append-icon="mdi-clock" />
                </v-col>
              </template>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="saveDialog = false">Abbrechen</v-btn>
          <v-btn @click="SAVE_PAGE" color="primary" dark>Speichern</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="selectMediaDialog" width="900">
      <v-card tile>
        <Media isDialog @onMediaSelected="onMediaSelected"/>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="editHtmlContentDialog"
      width="900"
      :style="{opacity}"
      :fullscreen="editHtmlContentFullscreen" persistent>
      <v-card tile>
        <v-toolbar dense flat color="blue-grey darken-3" dark>
          <v-toolbar-title>Edit HTML Content</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon v-if="editHtmlContentFullscreen" @click="editHtmlContentFullscreen = false"><v-icon>mdi-arrow-collapse-all</v-icon></v-btn>
            <v-btn icon v-else @click="editHtmlContentFullscreen = true"><v-icon>mdi-arrow-expand-all</v-icon></v-btn>
            <v-btn icon @click="editHtmlContentDialog = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="py-2">
          <TipTap :component="componentCache" @SAVE_CONTENT="SAVE_HTML_CONTENT" />
        </div>
      </v-card>
    </v-dialog>
  </v-app>
</template>


<script>
import { displayPage, getPages } from "@/api/apollo/queries";
import { mapState, mapActions, mapGetters } from "vuex";
import { updatePage, createComponent } from "@/api/apollo/mutations";
import { cloneDeep } from "lodash"

const now = Date.now();

export default {
  name: "PageBuilder",
  components: {
    Toolbar: () => import("./layout/Toolbar"),
    RightDrawer: () => import("./layout/RightDrawer"),
    BreadCrumb: () => import("./core/BreadCrumb"),
    DisplayComponents: () => import("./core/DisplayComponents"),
    Media: () => import("@/pages/admin/media/index"),
    TipTap: () => import("./TipTap")
  },
  computed: {
    ...mapState("builder", ["screenSize", "breadCrumb", "version"]),
    ...mapGetters({
      currentPage: "builder/GET_CURRENT_PAGE"
    }),
    containerBinds() {
      switch (this.screenSize) {
        case 0:
          // DESKTOP
          return { cols: 12 };
        case 1:
          // TABLET
          return { cols: 7 };
        case 2:
          return { cols: 3 };
      }
    }
  },
  props: {
    editMode: {
      type: Boolean,
      default: false
    }
  },
  apollo: {
    page: {
      query: displayPage,
      variables () {
        const id = parseInt(this.$route.query.id)
        return {
          id
        }
      },
      update: ({ displayPage }) => displayPage,
      result({ data: { displayPage } }) {
        if (displayPage) {
          displayPage.versionTime = now;
          //this.CHANGE_CURRENT_PAGE(displayPage);
          this.ADD_VERSION(displayPage);
        }
      },
      fetchPolicy: "network-only"
    }
  },
  data: () => ({
    page: null,
    publishDate: null,
    publishTime: null,
    publish: false,
    saveDialog: false,
    selectMediaDialog: false,
    editHtmlContentDialog: false,
    editHtmlContentFullscreen: false,
    componentCache: null,
    opacity: 1
  }),
  watch: {
    publish: {
      handler (publish) {
        if (publish) {
          this.publishDate = this.$moment().format("YYYY-MM-DD")
          this.publishTime = this.$moment().format("HH:mm")
        }
      },
    }
  },
  methods: {
    ...mapActions({
      CHANGE_CURRENT_PAGE: "builder/CHANGE_CURRENT_PAGE",
      ADD_VERSION: "builder/ADD_VERSION"
    }),
    OPEN_SAVE_DIALOG () {
      this.saveDialog = true
    },
    async SAVE_PAGE () {
      const _self = this
      const currentPage = this.currentPage

      currentPage.publishingDate = this.$moment().utc().format("YYYY-MM-DD HH:mm:ss")
      currentPage.isDraft = !this.publish
      if (this.publish) {
        const _publishDate = `${this.publishDate} ${this.publishTime}`
        currentPage.publishingDate = this.$moment(_publishDate).utc().format("YYYY-MM-DD HH:mm:ss")
      }

      // Create Page
      const page = await this.$apollo.mutate({
        mutation: updatePage,
        variables: currentPage,
        update (proxy, { data: { updatePage } }) {

          try {
            const cache = proxy.readQuery({
              query: getPages,
              variables: {

                query: null
              }
            })
          } catch {
            _self.onError
          }

        },
        error (error) {
          _self.onError(error, "APOLLO MUTATE SAVE PAGE")
        }
      });
      const pageId = page.data.updatePage.id
      const { components } = currentPage

      // Add root Components
      await components.forEach(async c => {
        const variables = {
          ...c,
          pageId
        }
        const component = await this.$apollo.mutate({
          mutation: createComponent,
          variables,
          error (error) {
            _self.onError(error, "APOLLO MUTATE SAVE PAGE")
          }
        })
        if (c.childs.length > 0) {
          const { childs } = c
          const _component = component.data.createComponent.id
          await this.ADD_CHILD_COMPONENTS(_component, childs)
        }
      });
      const currentRoute = this.$route
      //this.$store.commit("builder/RESET_BUILDER")
      this.saveDialog = false
      this.$router.push({
        path: currentRoute.path,
        query: {
          id: pageId
        }
      })
    },
    async ADD_CHILD_COMPONENTS (componentId, childs) {

      childs.forEach(async child => {
        const variables = {
          ...child,
          componentId
        }
        const component = await this.$apollo.mutate({
          mutation: createComponent,
          variables,
          update (proxy, { data }) {
          //console.log(data)
          },
          result: (data) => {
            //console.log(data)
          },
          error (error) {
            _self.onError(error, "APOLLO MUTATE SAVE PAGE")
          }
        })

        if (child.childs && child.childs.length > 0) {
          const _childs = child.childs
          const _component = component.data.createComponent.id
          await this.ADD_CHILD_COMPONENTS(_component, _childs)
        }
      })
    },
    SELECT_MEDIA_FOR_COMPONENT (payload) {
      this.componentCache = payload
      this.selectMediaDialog = true
    },
    EDIT_HTML_CONTENT_FOR_COMPONENT (payload) {
      this.componentCache = payload
      this.editHtmlContentDialog = true
    },
    onMediaSelected (media) {
      const { component, key} = this.componentCache
      const newComponent = cloneDeep(component)
      const { properties } = newComponent

      let _props = JSON.parse(properties)
      _props["src"] = "/api/media/v1/" + media.uuid
      _props["lazy-src"] = "/api/media/v1/" + media.uuid

      this.$store.dispatch("builder/CHANGE_CURRENT_COMPONENT_PROPERTIES", JSON.stringify(_props))
      this.selectMediaDialog = false
    },
    SAVE_HTML_CONTENT (content) {

      if (content) {
        this.$store.dispatch("builder/CHANGE_CURRENT_COMPONENT_CONTENT", content)
      }
      this.editHtmlContentDialog = false
    }
  },
  beforeCreate () {
    this.$store.commit("builder/RESET_BUILDER")
  }
};
</script>


<style lang="scss">
.tranparent__pattern {
  .v-content__wrap {
    background-image: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 5px,
        #ffffff 5px,
        #ffffff 10px
      ),
      repeating-linear-gradient(
        to right,
        #f1f1f1,
        #f1f1f1 5px,
        #ffffff 5px,
        #ffffff 10px
      );
  }
}
</style>
