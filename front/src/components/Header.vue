<template>
  <v-toolbar fixed class="indigo darken-4" dark>
    <v-toolbar-title class="mr-4">{ Ubicanos }</v-toolbar-title>

    <v-toolbar-items v-for="item in items" :key="item.id">
      <v-btn v-if="$store.state.isLoggedIn" flat dark :to="{name: item.route}">{{ item.title }}</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="!$store.state.isLoggedIn" flat dark :to="{name: 'register'}">
        Sign up
      </v-btn>
      <v-btn v-if="!$store.state.isLoggedIn" flat dark :to="{name: 'login'}">
        Login
      </v-btn>
      <v-btn v-if="$store.state.isLoggedIn" flat dark @click="logout">
        Log out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Categorias', icon: 'dashboard', route: 'Categorias' },
          { title: 'Ubicaciones', icon: 'question_answer', route: 'Ubicaciones' },
          { title: 'Ciudades', icon: 'question_answer', route: 'Ciudades' },
          { title: 'Oficinas', icon: 'question_answer', route: 'Oficinas' }
        ],
        right: null
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({
          name: 'login'
        })
      }
    }
  }
</script>
