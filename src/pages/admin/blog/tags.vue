<template>
  <v-container fluid>
    <CRUDTable :modelName="modelName"/>
  </v-container>
</template>

<script>
  import { IS_AUTHENTICATED } from "@/api/guards";
  export default {
    name: "Tags",
    components: {
      CRUDTable: () => import("@/components/CRUD")
    },
    data: () => ({
      modelName: "tags"
    }),
    beforeRouteEnter: IS_AUTHENTICATED
  }
</script>
