import { displayNavigation } from "@/api/apollo/queries"
import ClientOnly from "vue-client-only"
export default {
  components: {
    ClientOnly
  },
  apollo: {
    navigation: {
      query: displayNavigation,
      variables () {
        return this.navigationQuery
      },
      update: ({ displayNavigation }) => displayNavigation,
    }
  },
  data: () => ({
    navigation: null,
    navigationQuery: null
  })
}
