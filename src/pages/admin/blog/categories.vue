<template>
  <v-container fluid>
    <CRUDTable :modelName="modelName"/>
  </v-container>
</template>

<script>
  import { IS_AUTHENTICATED } from "@/api/guards";
  export default {
    name: "BlogCategories",
    components: {
      CRUDTable: () => import("@/components/CRUD")
    },
    data: () => ({
      modelName: "blogcategories"
    }),
    beforeRouteEnter: IS_AUTHENTICATED
  }
</script>
