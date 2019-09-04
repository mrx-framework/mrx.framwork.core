<template>
  <v-container fluid>
    <CRUDTable :modelName="modelName" />
  </v-container>
</template>

<script>
import { IS_AUTHENTICATED } from "@/api/guards";

export default {
  name: "Users",
  components: {
    CRUDTable: () => import("@/components/CRUD")
  },
  data: () => ({
    modelName: "users"
  }),
  beforeRouteEnter: IS_AUTHENTICATED
};
</script>
