<template>
  <div>
    <v-text-field
      label="Dateien auswählen"
      prepend-icon="mdi-file-plus-outline"
      v-model="fileName"
      readonly
      hide-details
      @click="triggerFileChange"
      @click:prepend="triggerFileChange" />
    <input class="hidden--file--picker" type="file" ref="filePicker" @change="handleFileChange" multiple/>
  </div>
</template>

<script>
export default {
  name: "FileSelector",
  data: () => ({
    fileName: "",
    file: null
  }),
  methods: {
    handleFileChange (e) {
      console.log(e.target.files.length)
      this.file = e.target.files[0]
      if (e.target.files.length > 1){
        this.fileName = `${this.file.name} (+ ${e.target.files.length - 1}) `
      }
      else {
        this.fileName = this.file.name
      }

      this.$emit("onFilesChanged", e.target.files)
    },
    triggerFileChange () {
      console.log("trigger")
      this.$refs.filePicker.click()
    }
  }
}
</script>

<style lang="scss">
  .hidden--file--picker {
    display: none;
  }
</style>
