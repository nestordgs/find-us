<template>
  <v-toolbar fixed class="indigo darken-4" dark>
    <v-toolbar-title class="mr-4">{ Ubicanos }</v-toolbar-title>

    <v-toolbar-items v-for="item in items">
      <v-btn flat dark :to="{name: item.route}">{{ item.title }}</v-btn>
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
    }
  }
</script>
