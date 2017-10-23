<template>
  <v-toolbar fixed class="indigo darken-4" dark>
    <v-toolbar-title class="mr-4 hidden-sm-and-down">{ Ubicanos }</v-toolbar-title>
    <v-toolbar-items v-for="item in items" :key="item.id" class="hidden-sm-and-down">
      <v-btn v-if="$store.state.isLoggedIn" flat dark :to="{name: item.route}">{{ item.title }}</v-btn>
    </v-toolbar-items>
    <v-menu v-if="$store.state.isLoggedIn" bottom left class="hidden-md-and-up">
      <v-btn icon slot="activator">
        <v-icon>fa-bars</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-title>
            <router-link tag="span" :to="{name: item.route}">
              {{ item.title }}
            </router-link>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="!$store.state.isLoggedIn" flat dark :to="{name: 'register'}">
        Sign up
      </v-btn>
      <v-btn v-if="!$store.state.isLoggedIn" flat dark :to="{name: 'login'}">
        Login
      </v-btn>
    </v-toolbar-items>
    <v-menu v-if="$store.state.isLoggedIn" bottom right origin="center center" transition="scale-transition">
      <v-btn icon slot="activator" dark>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile>
          <v-list-tile-title @click="logout">Log out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        drawer: false,
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
