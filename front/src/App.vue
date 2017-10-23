<template>
  <div id="app">
    <v-app toolbar>
      <page-header :items="items"></page-header>

      <main>
        <v-container fluid>
          <vue-snotify></vue-snotify>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import Routes from '@/router/routes.json'
export default {
  name: 'app',
  components: {
    PageHeader
  },
  data () {
    return {
      items: Routes.items
    }
  }
}
</script>

<style lang="scss">
@import "assets/sass/main";
@import "~vue-snotify/styles/simple";
</style>
