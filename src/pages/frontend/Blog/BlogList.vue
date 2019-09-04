<template>
  <v-container
    v-if="posts"
    fluid
    class="pa-0 ma-0"
    :class="{'fill-height': posts.length === 0}"
    :style="{'margin-top': posts.length === 0 ? '-64px !important' : 0}"
  >
    <v-container v-if="posts.length > 0">
      <v-row>
        <v-col cols="8">
          <v-card tile v-for="post in posts" :key="post.id" @click="navigate(post.path)">
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-text>{{ GET_TEASER(post.content) }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4"></v-col>
      </v-row>
    </v-container>
    <v-container v-else class="fill-height text-center align-center justify-center">
      <div>
        <h1
          class="grey--text text--lighten-2 text-uppercase"
        >{{ $t("placeholders.blank_page_header") }}</h1>
        <h2
          class="grey--text text--lighten-3 text-uppercase"
        >{{ $t("placeholders.blank_page_subheader") }}</h2>
      </div>
    </v-container>
  </v-container>
  <v-row v-else align="center" justify="center">
    <v-col cols="5" class="text-center" style="min-height: 200px;">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
import { getBlogPosts } from "@/api/apollo/queries/blog.queries";
export default {
  computed: {
    posts() {
      if (!this.blogposts) return null;
      return this.blogposts.data;
    }
  },
  apollo: {
    blogposts: {
      query: getBlogPosts,
      variables: {
        page: 1,
        limit: 5,
        query: null
      },
      update: ({ blogposts }) => blogposts
    }
  },
  data: () => ({
    blogposts: null
  }),
  methods: {
    navigate(path) {
      const newPath = `${this.$route.path}${path}`;
      this.$router.push(newPath);
    },
    GET_TEASER(content) {
      let cnt = content;
      if (content.match(/<strong>(.*?)<\/strong>/g).length) {
        cnt = content.match(/<strong>(.*?)<\/strong>/g)[0];
      }
      return cnt.replace("<strong>", "").replace("</strong>", "");
    }
  }
};
</script>
