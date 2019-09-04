<template>
  <v-layout align-center style="height: 25px">
    <template v-for="(item, index) in items">
      <div
        :key="item.text"
        class="text-uppercase subtitle-2"
        :class="{'primary--text': !item.disabled, 'cursor--pointer': !item.disabled}"
        @click="navigate(item.href)">
        {{ item.text }}
      </div>
      <div v-if="index < (items.length - 1)" :key="`divider_${index}`" class="mx-1" style="padding-bottom: 2px"><v-icon>mdi-chevron-right</v-icon></div>
    </template>
  </v-layout>
</template>

<script>
  export default {
    name: "Breadcrumb",
    computed: {
      items () {
        const route = this.$route
        if (this.data && this.data.parent) {
          return [
            {
              text: this.data.parent.definition.title.singular,
              disabled: false,
              href: route.path
            },
            {
              text: `${this.data.parent.data.name}`,
              disabled: true,
              href: null
            },
            {
              text: `${this.definition.title.plural}`,
              disabled: true,
              href: null
            }
          ]
        }
        else {
          return [
            {
              text: this.definition.title.plural,
              disabled: true,
              href: route.path
            }
          ]
        }
      }
    },
    props: {
      data: {
        type: Object,
        default: () => {}
      },
      definition: {
        type: Object,
        required: true,
        default: () => {}
      }
    },
    methods: {
      navigate (path) {
        if (path) {
          this.$router.push(path)
        }
      }
    }
  }
</script>

