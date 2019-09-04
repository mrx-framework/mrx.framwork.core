<template>
  <v-container fluid class="fill-height text-center align-center justify-center">
    <div>
      <h1 class="grey--text text--lighten-2 text-uppercase">THEME</h1>
      <h2 class="grey--text text--lighten-3 text-uppercase">THIS SECTION IS NOT IMPLEMENTED YET</h2>
    </div>
  </v-container>
</template>

<script>
  import { IS_AUTHENTICATED } from '@/api/guards'

  export default {
    name: 'Theme',
    beforeRouteEnter: IS_AUTHENTICATED
  }
</script>
