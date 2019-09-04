<template>
  <v-img :src="src" :lazy-src="src" class="grey lighten-2" :contain="contain">
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  name: "DisplayImage",
  props: {
    uuid: {
      type: String,
      required: true
    },
    orientation: {
      type: String,
      default: "landscape"
    },
    size: {
      type: String
    },
    contain: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dimensions: {
      landscape: {
        Thumbnail: 100,
        Mobile: 400,
        Display: 1024,
        FullSize: 1920
      }
    }
  }),
  computed: {
    src() {
      const root = "/api/media/v1";
      let mediaPath = `${root}/${this.uuid}`;

      let query;
      if (this.size) {
        query = this.orientation === "landscape" ? "width=" : "height=";

        query += this.dimensions[this.orientation][this.size];

        mediaPath += `?${query}`;
      }

      return mediaPath;
    }
  }
};
</script>
