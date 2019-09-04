<template>
  <v-container fluid>
    <CRUDTable
      :modelName="modelName"
      disableNew
      disableEdit
      disableDestroy />
  </v-container>
</template>

<script>
  import { IS_AUTHENTICATED } from "@/api/guards";
  export default {
    name: "Permissions",
    components: {
      CRUDTable: () => import("@/components/CRUD")
    },
    data: () => ({
      modelName: "permissions"
    }),
    beforeRouteEnter: IS_AUTHENTICATED
  }
</script>
