<template>
  <v-autocomplete
    :label="`${label} auswählen`"
    :items="items"
    :multiple="multiple"
    :chips="multiple"
    :deletable-chips="multiple"
    :search-input.sync="query"
    :item-text="definition.itemText"
    v-model="selected"
    @input="$emit('onSelected', selected)"
    auto-select-first
    hide-no-data
    hide-selected
    return-object
    :autofocus="!disableAutofocus"
    :clearable="isPrefilled" />
</template>

<script>
  import { getDefinitionForQuery } from '@/api/apollo/definitions'
  import { debounce } from "lodash"
  export default {
    name: "Lookup",
    computed: {
      label () {
        const { title } = this.definition
        return this.multiple ? title.plural : title.singular
      }
    },
    props: {
      definition: {
        type: Object,
        required: true,
        default: () => {}
      },
      multiple: {
        type: Boolean,
        default: false
      },
      prefilled: {
        type: Object
      },
      disableAutofocus: {
        type: Boolean,
        default: false
      }
    },
    apollo: {
      items: {
        query () {
          return this.definition.handlers.getList
        },
        variables () {
          return {
            page: 1,
            limit: 10,
            query: this.query
          }
        },
        update (data) {
          return data[this.definition.name.plural].data
        },
        skip: true
      }
    },
    watch: {
      query: {
        handler: debounce(function(to, from) {
          if (to) {
            this.$apollo.queries.items.skip = false
            this.$apollo.queries.items.refetch()
          }
        }, 150)
      }
    },
    data: () => ({
      query: "",
      items: [],
      selected: null,
      isPrefilled: false
    }),
    mounted () {
      if (this.prefilled) {
        this.isPrefilled = true
        this.items.push(this.prefilled)
        this.selected = this.prefilled
      }
    }
  }
</script>

