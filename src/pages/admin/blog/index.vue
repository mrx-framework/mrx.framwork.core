<template>
  <v-container fluid>
    <CRUDTable
      :modelName="modelName"
      viewElementAction="/admin/blog/action?id=:id"
      refetchOnMount />
  </v-container>
</template>

<script>
import currentUser from "@/mixins/currentUser";
import { IS_AUTHENTICATED } from "@/api/guards";
export default {
  name: "Blog",
  components: {
    CRUDTable: () => import("@/components/CRUD")
  },
  mixins: [currentUser],
  data: () => ({
    modelName: "blogpost"
  }),
  beforeRouteEnter: IS_AUTHENTICATED
};
</script>
