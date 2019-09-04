<template>
  <v-container fluid v-if="blogpost">
    <v-row>
      <v-col cols="9">
        <v-card tile>
          <v-container fluid >
            <v-row>
              <v-col cols="12"><v-text-field :label="$t('labels.title')" v-model="blogpost.title" hide-details /></v-col>
              <v-col cols="12"><v-text-field :label="$t('labels.path')" v-model="blogpost.path" hide-details /></v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card tile>
          <TipTap :defaultContent="blogpost.content" @input="(v) => blogpost.content = v" />
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card tile class="mb-5">
          <v-toolbar tag="div" dense flat>
            <v-toolbar-title>{{ $t("common.publish") }}</v-toolbar-title>
          </v-toolbar>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="PUBLISH_POST">{{ $t("common.publish") }}</v-btn>
          </v-card-actions>
        </v-card>

        <v-card tile class="mb-5">
          <v-toolbar tag="div" dense flat>
            <v-toolbar-title>{{ $t("common.category") }}</v-toolbar-title>
          </v-toolbar>
          <v-container fluid>
            <Lookup :definition="categoryDefinition" disableAutofocus @onSelected="SELECT_CATEGORY" />
          </v-container>
        </v-card>

        <v-card tile>
          <v-toolbar tag="div" dense flat>
            <v-toolbar-title>{{ $t("common.tags") }}</v-toolbar-title>
          </v-toolbar>
          <v-container fluid>
            <Lookup :definition="tagDefinition" multiple disableAutofocus @onSelected="SELECT_TAGS" />
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import currentUser from "@/mixins/currentUser"
  import { IS_AUTHENTICATED } from "@/api/guards";
  import { getBlogPost } from "@/api/apollo/queries/blog.queries"
  import { updateBlogPost } from "@/api/apollo/mutations/blog.mutations"
  import TipTap from "@/components/PageBuilder/TipTap"
  import Lookup from "@/components/CRUD/Lookup"
  import { getDefinitionForQuery } from "@/api/apollo/definitions"

  export default {
    name: "EditOrCreateBlog",
    mixins: [currentUser],
    components: { TipTap, Lookup },
    computed: {
      postId () {
        return parseInt(this.$route.query.id) || null
      },
      categoryDefinition () {
        return getDefinitionForQuery("blogcategories")
      },
      tagDefinition () {
        return getDefinitionForQuery("tags")
      }
    },
    apollo: {
      blogpost: {
        query: getBlogPost,
        variables () {
          return {
            id: this.postId
          }
        },
        update: ({ blogpost }) => blogpost
      }
    },
    data: () => ({
      blogpost: null,
      category: null,
      tags: null
    }),
    methods: {
      SELECT_CATEGORY (c) {
        this.category = c
      },
      SELECT_TAGS (t) {
        this.tags = t
      },
      async PUBLISH_POST () {
        if (!this.blogpost) return
        const variables = {
          id: this.postId,
          title: this.blogpost.title,
          path: this.blogpost.path,
          content: this.blogpost.content,
          category: this.category ? this.category.id : null,
          tags: this.tags ? this.tags.map(t => t.id) : null,
          createdAt: this.blogpost.createdAt,
          uuid: this.blogpost.uuid,
          isDraft: false
        }

        const blogpost = await this.$apollo.mutate({
          mutation: updateBlogPost,
          variables
        })
      }
    },
    beforeRouteEnter: IS_AUTHENTICATED
  }
</script>


