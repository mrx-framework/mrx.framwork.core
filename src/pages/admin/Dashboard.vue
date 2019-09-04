<template>
  <v-container fluid class="fill-height text-center align-center justify-center">
    <div>
      <h1 class="grey--text text--lighten-2 text-uppercase">DASHBOARD</h1>
      <h2 class="grey--text text--lighten-3 text-uppercase">THIS SECTION IS NOT IMPLEMENTED YET</h2>
    </div>
  </v-container>
</template>

<script>
import { IS_AUTHENTICATED } from "@/api/guards";

export default {
  name: "Dashboard",
  beforeRouteEnter: IS_AUTHENTICATED
};
</script>

<style lang="scss">
.offset--section {
  margin-top: -65px;
}
</style>
