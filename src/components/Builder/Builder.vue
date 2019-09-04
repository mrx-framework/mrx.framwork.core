<template>
  <component :is="component" v-bind="getProps">
    <Builder
      v-for="(node, i) in nodes"
      :key="i"
      v-bind="node">
    </Builder>
    <section v-if="innerHTML" v-html="innerHTML"></section>
  </component>
</template>

<script>
  export default {
    components: {
      Builder: () => import('./Builder.vue')
    },
    computed: {
      getProps () {
        if (!this.props) return null
        return this.props.map(p => {
          return typeof p === 'object' ?
            {[p.key]: p.value} :
            {[p]: true}
        })
      }
    },
    props: {
      component: {
        type: String,
        required: true
      },
      props: {
        type: Array,
        default: () => []
      },
      nodes: {
        type: Array,
        default: () => []
      },
      innerHTML: {
        type: String
      }
    }
  }
</script>
