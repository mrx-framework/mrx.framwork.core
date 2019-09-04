import { getCurrentUser } from "@/api/apollo/queries"

export default {
  apollo: {
    currentUser: {
      query: getCurrentUser,
      update: ( { currentUser } )  => currentUser
    }
  },
  data: () => ({
    currentUser: null
  })
}
