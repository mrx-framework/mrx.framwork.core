<template>
  <PageBuilder editMode :drawer="drawer" @onToggleDrawer="drawer = !drawer" />
</template>

<script>
  import PageBuilder from "@/components/PageBuilder"
  export default {
    name: "EditOrCreatePage",
    components: {
      PageBuilder
    },
    computed: {
      isNew () {
        return !this.$route.query.hasOwnProperty("id")
      },
      id () {
        return this.isNew ? this.$route.query.id : null
      }
    },
    data: () => ({
      drawer: false
    })
  }
</script>


<style lang="scss">
  .content-editor {
    padding: 20px;
    border-radius: 3px;
    border: 1px dotted #424242;
    background: rgba(0,0,0,0.05)
  }
</style>


