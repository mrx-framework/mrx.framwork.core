<template>
  <div class="tip-tap-editor" v-if="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div>
        <v-toolbar dense flat height="32">
          <v-toolbar-items>
            <v-btn small tile depressed :color="isActive.bold() ? 'grey lighten-3' : 'white'" @click="commands.bold"><v-icon>mdi-format-bold</v-icon></v-btn>
            <v-btn small tile depressed :color="isActive.italic() ? 'grey lighten-3' : 'white'" @click="commands.italic"><v-icon>mdi-format-italic</v-icon></v-btn>
            <v-btn small tile depressed :color="isActive.underline() ? 'grey lighten-3' : 'white'" @click="commands.underline"><v-icon>mdi-format-underline</v-icon></v-btn>
          </v-toolbar-items>
          <v-divider vertical />
          <v-toolbar-items>
            <v-btn small tile depressed :color="showHeadings || isActive.heading() ? 'grey lighten-3' : 'white'" @click="showHeadings = !showHeadings"><v-icon >mdi-format-header-equal</v-icon></v-btn>
            <v-btn small tile depressed :color="isActive.blockquote() ? 'grey lighten-3' : 'white'" @click="commands.blockquote"><v-icon >mdi-format-quote-close</v-icon></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-toolbar v-if="showHeadings || isActive.heading()" dense flat color="grey lighten-3" height="32">
          <v-toolbar-items>
            <v-btn small tile depressed :color="isActive.heading({ level: 1 }) ? 'grey lighten-2' : 'grey lighten-3'" @click="commands.heading({ level: 1 })"><v-icon>mdi-format-header-1</v-icon></v-btn>
            <v-btn small tile depressed :color="isActive.heading({ level: 2 }) ? 'grey lighten-2' : 'grey lighten-3'" @click="commands.heading({ level: 2 })"><v-icon>mdi-format-header-2</v-icon></v-btn>
            <v-btn small tile depressed :color="isActive.heading({ level: 3 }) ? 'grey lighten-2' : 'grey lighten-3'" @click="commands.heading({ level: 3 })"><v-icon>mdi-format-header-3</v-icon></v-btn>
            <v-btn small tile depressed :color="isActive.heading({ level: 4 }) ? 'grey lighten-2' : 'grey lighten-3'" @click="commands.heading({ level: 4 })"><v-icon>mdi-format-header-4</v-icon></v-btn>
            <v-btn small tile depressed :color="isActive.heading({ level: 5 }) ? 'grey lighten-2' : 'grey lighten-3'" @click="commands.heading({ level: 5 })"><v-icon>mdi-format-header-5</v-icon></v-btn>
            <v-btn small tile depressed :color="isActive.heading({ level: 6 }) ? 'grey lighten-2' : 'grey lighten-3'" @click="commands.heading({ level: 6 })"><v-icon>mdi-format-header-6</v-icon></v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </div>
    </editor-menu-bar>

    <div class="editor-section pa-5">
      <editor-content :editor="editor" />
    </div>
    <v-container fluid class="text-right">
      <v-btn class="mr-2">Cancel</v-btn>
      <v-btn color="primary" @click="SAVE_CONTENT">Save</v-btn>
    </v-container>
  </div>
</template>


<script>
  import { Editor, EditorContent, EditorMenuBar } from "tiptap"
  import { Heading, Bold, Italic, Underline, HardBreak, Blockquote  } from "tiptap-extensions"

  export default {
    name: "TipTapEditor",
    components: {
      EditorContent,
      EditorMenuBar
    },
    props: {
      component: {
        type: Object,
        required: true,
        default: () => {}
      }
    },
    data: () => ({
      showHeadings: false,
      editor: null
    }),
    methods: {
      SAVE_CONTENT () {
        //this.$emit("SAVE_CONTENT")
        const htmlContent = this.editor.getHTML()
        this.$emit("SAVE_CONTENT", htmlContent)
      }
    },
    mounted () {
      const { content } = this.component
      this.editor =  new Editor({
        content,
        autoFocus: true,
        extensions: [
          new Bold(),
          new Italic(),
          new Underline(),
          new Heading(),
          new HardBreak(),
          new Blockquote()
        ],
      })
    },
    beforeDestroy () {
      if (this.editor)
        this.editor.destroy()
    },
  }
</script>

<style lang="scss">
  .tip-tap-editor {
    //border: 1px solid #ccc;
  }
</style>
