<template>
  <v-container fluid>
    <CRUDTable :modelName="modelName" />
  </v-container>
</template>

<script>
  import currentUser from "@/mixins/currentUser"
  import { IS_AUTHENTICATED } from "@/api/guards";
  export default {
    name: "Roles",
    components: {
      CRUDTable: () => import("@/components/CRUD")
    },
    mixins: [currentUser],
    data: () => ({
      modelName: "roles"
    }),
    beforeRouteEnter: IS_AUTHENTICATED
  }
</script>
