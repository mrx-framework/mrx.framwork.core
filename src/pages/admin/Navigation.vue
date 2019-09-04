<template>
  <v-container fluid>
    <CRUDTable :modelName="modelName" hideAttatchDetach showChildActions :useCacheHandler="false" />
  </v-container>
</template>

<script>
import { IS_AUTHENTICATED } from "@/api/guards";

export default {
  name: "Navigations",
  components: {
    CRUDTable: () => import("@/components/CRUD")
  },
  data: () => ({
    modelName: "navlocations"
  }),
  beforeRouteEnter: IS_AUTHENTICATED
}
</script>
