<template>
  <component :is="tag"><slot></slot></component>
</template>

<script>
export default {
  name: "DynamicText",
  props: {
    tag: {
      type: String,
      default: "span"
    }
  }
}
</script>
