<template>
  <vue-fragment>
    <Builder
      v-for="(c, i) in content"
      :key="i"
      :component="c.component"
      :props="c.props"
      :nodes="c.nodes"
      />
  </vue-fragment>
</template>


<script>

  export default {
    name: 'BuildWrapper',
    components: {
      Builder: () => import('./Builder')
    },
    props: {
      content: {
        type: Array,
        default: () => []
      }
    }
  }
</script>
