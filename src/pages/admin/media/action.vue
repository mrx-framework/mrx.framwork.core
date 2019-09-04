<template>
  <v-container fluid>
    <v-card tile>
      <v-toolbar dense flat tag="div">
        <v-toolbar-title class="text-uppercase subtitle-2">Medien</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-row>
        <v-col cols="9">
          <v-container fluid v-if="model" >
            <!--<v-img :src="model.src" />-->
            <div ref="cropperContainer">
              <vue-cropper
                ref="cropper"
                :viewMode="2"
                :zoomable="false"
                :src="model.src"
                :alt="model.name" />
            </div>
            <pre>
            </pre>
          </v-container>
        </v-col>
        <v-col cols="3">
          <v-container fluid class="py-0" v-if="model">
            <v-row>
              <v-col cols="12"><v-text-field label="Name" v-model="model.name" hide-details /></v-col>
              <v-col cols="12"><v-text-field label="Alt-Text" hide-details/></v-col>
              <v-col cols="12" class="text-right">
                <v-btn text @click="GET_DATA">GET_DATA</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
  import { mapState } from "vuex"
  import { cloneDeep } from "lodash"
  import VueCropper from "vue-cropperjs"
  import "cropperjs/dist/cropper.css"

  export default {
    name: "MediaAction",
    components: { VueCropper },
    computed: {
      ...mapState("media", ["currentMedias"]),
      getMedia () {
        return this.currentMedias[this.seleted]
      },
      getCropper () {
        return this.$refs.cropper
      }
    },
    watch: {
      getMedia: {
        handler (media) {
          this.model = media ? media : null
          console.log(this.$refs.copper)
        },
        immediate: true
      },
      cropperElement: {
        handler (cropper) {

        }
      }
    },
    data: () => ({
      cropperElement: null,
      seleted: 0,
      model: null,
      croppedImage: null,
      dimensions: {
        landscape: {
          thumb: 100,
          mobile: 480,
          display: 1024,
          fullSize: 1920
        }
      },
    }),
    methods: {
      GET_DATA () {
        console.log(this.cropperElement.getData())
        this.cropperElement.setData({
          width: 1920
        })
      }
    },
    mounted () {
      this.cropperElement = this.$refs.cropper
      // this.$refs.cropper.setData({ width: this.getCropDimension })
    }
  }
</script>
