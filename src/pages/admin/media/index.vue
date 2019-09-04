<template>
  <v-container fluid>
    <v-card tile :flat="isDialog">
      <v-toolbar dense flat tag="div" v-if="!isDialog">
        <v-toolbar-title class="text-uppercase subtitle-2">Medien</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-text class="my-0 py-0"  v-if="!isDialog">
        <p class="subtitle-2">{{ $t("descriptions.manage_medias") }}</p>
      </v-card-text>
      <v-toolbar flat dense color="grey lighten-4" tag="div">
        <v-toolbar-items>
          <v-btn text @click="dialog = true">
            <v-icon left small>mdi-cloud-upload-outline</v-icon> Upload
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container fluid>
        <v-row dense>
          <v-col
            cols="2"
            v-for="media in getMediaList"
            :key="media.uuid"
            class="d-flex child-flex">
            <v-card flat tile class="d-flex" outlined hover @click="MEDIA_SELECTED(media)">
              <DisplayImage :uuid="media.uuid" size="Mobile" grid="landscape" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-dialog v-model="dialog" width="500">
      <v-card tile>
        <v-form>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <FileSelector @onFilesChanged="SET_FILES" />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Abbrechen</v-btn>
          <v-btn text color="primary" @click="UPLOAD_IMAGE">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import api from "@/api"
  import { IS_AUTHENTICATED } from "@/api/guards"
  import { mapActions, mapState } from "vuex"

  export default {
    name: "Media",
    components: {
      FileSelector: () => import("@/components/FileSelector"),
      DisplayImage: () => import("@/components/DisplayImage")
    },
    props: {
      isDialog: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState("media", ["mediaList"]),
      page () {
        return this.$route.query.page ?
          this.$route.query.page :
          1
      },
      getMediaList () {
        return this.mediaList && this.mediaList.rows.length ?
          this.mediaList.rows : []
      },
    },
    data: () => ({
      dialog: false,
      images: []
    }),
    methods: {
      ...mapActions({
        init: "media/FETCH_MEDIAS",
        upload: "media/UPLOAD_MEDIAS"
      }),
      async UPLOAD_IMAGE () {
        let formData = new FormData()
        for (let i = 0; i < this.images.length; i++) {
          let image = this.images[i]
          formData.append(`images`, image, image.name)
        }
        this.upload(formData)
        this.dialog = false
      },
      SET_FILES (images) {
        this.images = images
      },
      MEDIA_SELECTED (media) {
        if (this.isDialog) {
          this.$emit("onMediaSelected", media)
        }
      }
    },
    created () {
      this.init({ page: 1 })
    }
    //beforeRouteEnter: IS_AUTHENTICATED
  }
</script>
