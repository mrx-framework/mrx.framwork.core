<template>
  <v-container fluid>
    <CRUDTable
      :modelName="modelName"
      viewElementAction="/admin/pages/action?id=:id"
      refetchOnMount />
  </v-container>
</template>

<script>
  import currentUser from "@/mixins/currentUser"
  import { IS_AUTHENTICATED } from "@/api/guards";
  export default {
    name: "Pages",
    components: {
      CRUDTable: () => import("@/components/CRUD")
    },
    mixins: [currentUser],
    data: () => ({
      modelName: "pages"
    }),
    beforeRouteEnter: IS_AUTHENTICATED
  }
</script>
