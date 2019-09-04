<template>
  <div>
    <!--Use the component in the right place of the template-->
    <tiptap-vuetify
      v-model="content"
      placeholder="Whats up today?"
      :extensions="extensions" />

     <v-container fluid class="text-right" v-if="component.content">
      <v-btn class="mr-2">Cancel</v-btn>
      <v-btn color="primary" @click="SAVE_CONTENT">Save</v-btn>
    </v-container>
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  CodeBlock,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from "tiptap-vuetify";

export default {
  // specify in the list of components
  components: { TiptapVuetify },
  props: {
    component: {
      type: Object,
      default: () => ({ content: undefined })
    },
    defaultContent: {
      type: String
    }
  },
  watch: {
    content (v) {
      this.$emit("input", v)
    }
  },
  data: () => ({
    // declare extensions you want to use
    extensions: [
      // you can specify options for extension
      new Heading({
        levels: [1, 2, 3]
      }),
      new Bold(),
      new Italic(),
      new Strike(),
      new Underline(),
      new Code(),
      new CodeBlock(),
      new Paragraph(),
      new BulletList(),
      new OrderedList(),
      new ListItem(),
      new Link(),
      new Blockquote(),
      new HardBreak(),
      new HorizontalRule(),
      new History()
    ],
    // starting content for the editor
    content: ``
  }),
  methods: {
    SAVE_CONTENT() {
      const htmlContent = this.content
      this.$emit("SAVE_CONTENT", htmlContent)
    }
  },
  mounted() {
    const { content } = this.component;
    this.content = content || this.defaultContent;
  }
};
</script>
