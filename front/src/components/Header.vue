<template>
  <div>
    <v-navigation-drawer temporary v-model="drawer" light overflow absolute>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <vue-letter-avatar name='John Leider' size='40' :rounded="true"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link tag="span" :to="{name: item.route}">
                {{ item.title}}
              </router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="indigo darken-4" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link class="home" tag="span" :to="{name: 'Hello'}">
          { Ubicanos }
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat dark :to="{name: 'Login'}">Iniciar Sesion</v-btn>
        <v-btn flat dark :to="{name: 'Register'}">Registrarse</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        items: [
          {title: 'Categorias', icon: 'dashboard', route: 'Categorias'},
          {title: 'Ubicaciones', icon: 'fa-location-arrow', route: 'Ubicaciones'},
          {title: 'Ciudades', icon: 'fa-map-marker', route: 'Ciudades'},
          {title: 'Oficinas', icon: 'fa-globe', route: 'Oficinas'}
        ],
        right: null,
        mini: true
      }
    }
  }
</script>
