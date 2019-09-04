<template>
  <v-container fluid>
    <CRUDTable :modelName="modelName" hideAttatchDetach showChildActions :useCacheHandler="false" />
  </v-container>
</template>

<script>
import { IS_AUTHENTICATED } from "@/api/guards";

export default {
  name: "Forms",
  components: {
    CRUDTable: () => import("@/components/CRUD")
  },
  data: () => ({
    modelName: "forms"
  }),
  beforeRouteEnter: IS_AUTHENTICATED
}
</script>
