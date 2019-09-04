<template>
  <section class="edit">
    <v-layout row align-center>
      <v-divider />
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="400"
        offset-y
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn small icon class="mx-2" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs4>1</v-flex>
              <v-flex xs4>2</v-flex>
              <v-flex xs4>3</v-flex>
              <v-flex xs4>4</v-flex>
            </v-layout>
          </v-container>
        </v-card>

      </v-menu>
      <v-divider />
    </v-layout>
  </section>
</template>

<script>
  export default {
    name: 'BuildTools',
    data: () => ({
      menu: false
    })
  }
</script>
