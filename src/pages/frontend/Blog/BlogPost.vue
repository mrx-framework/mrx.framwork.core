<template>
  <v-container v-if="blogpost">
    <v-row>
      <v-col cols="9">
        <v-card tile>
          <v-container fluid>
            <h1 class="display-1 mb-5">{{blogpost.title}}</h1>
            <div class="mb-5">
              <v-chip pill small class="mr-3">
                <v-icon small class="mr-2">mdi-flag-outline</v-icon>
                {{ blogpost.category.name }}
              </v-chip>

              <v-chip pill small class="mr-3">
                <v-icon small class="mr-2">mdi-account-outline</v-icon>
                {{ blogpost.author.firstname }} {{ blogpost.author.lastname }}
              </v-chip>

              <v-chip pill small class="mr-3">
                <v-icon small class="mr-2">mdi-calendar-month-outline</v-icon>
                {{ $moment.utc(parseInt(blogpost.createdAt)).format("LLL")}}
              </v-chip>
            </div>
            <section v-html="blogpost.content" class="mb-8"></section>
            <div>
              <v-chip pill small class="mr-3" v-for="tag in blogpost.tags" :key="tag.id">
                <v-icon small class="mr-2">mdi-tag-outline</v-icon>
                {{ tag.name }}
              </v-chip>
            </div>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { displayBlogPost } from "@/api/apollo/queries/blog.queries";

export default {
  computed: {
    postPath() {
      const { path } = this.$route.params;
      return `/${path}`;
    }
  },
  apollo: {
    blogpost: {
      query: displayBlogPost,
      variables() {
        return {
          path: this.postPath
        };
      },
      update: ({ displayblogpost }) => displayblogpost
    }
  },
  data: () => ({
    blogpost: null
  })
};
</script>
