<template>
  <v-layout fill-height row>
    <v-flex md9 class="hidden-sm-and-down">
      <v-img
        src="/api/media/v1/00000000-0000-0000-0000-00000000000"
        lazy-src="/api/media/v1/00000000-0000-0000-0000-00000000000"
        style="height: 100vh; width: 100%"
      />
    </v-flex>
    <v-flex md3 sm12 pa-5>
      <v-form class="px-5">
        <v-container fluid>
          <h1 class="text-uppercase text-center headline my-5">
            <span class="font-weight-bold">mrx.</span><span class="font-weight-thin">framework</span>
          </h1>
          <v-layout row wrap pa-5 justify-center>
            <v-flex xs12>
              <v-text-field
                v-model="username"
                label="Username"/>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                autofocus
                v-model="password"
                label="Passwort"
                type="password" />
            </v-flex>
            <v-flex xs7>
              <v-btn block color="primary" @click="LOGIN">Login</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import api from '@/api'
  export default {
    name: 'Login',
    data: () => ({
      username: 'admin',
      password: ''
    }),
    methods: {
      async LOGIN () {
        const payload = {
          username: this.username,
          password: this.password
        }
        try {
          const isAuthenticated = await api.LOCAL_LOGIN(payload)
          this.$router.push('/admin')
        } catch (error) {
          const { response } = error
          if (response) {
            console.log('response', response)
          }
          else {
            console.log('error', error)
          }
        }
      }
    }
  }
</script>
