<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">{ Ubicanos }</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link tag="li" :to="{ name: 'Hello' }" class="nav-item">
            <a class="nav-link">Hello</a>
          </router-link>
          <router-link tag="li" :to="{ name: 'Register' }" class="nav-item">
            <a class="nav-link">Register</a>
          </router-link>
          <!--<router-link tag="li" :to="{ name: 'Categorias' }" class="nav-item">
            <a class="nav-link">Categorias</a>
          </router-link>-->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownCategorias" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Categorias
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownCategorias">
              <router-link :to="{ name: 'Categorias' }" class="dropdown-item">Categorias</router-link>
              <router-link :to="{ name: 'CategoriaAdd'}" class="dropdown-item">Crear Categoria</router-link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownUbicaciones" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Estados
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownUbicaciones">
              <router-link :to="{ name: 'Ubicaciones' }" class="dropdown-item">Estados</router-link>
              <!--<router-link :to="{ name: 'UbicacionesAdd'}" class="dropdown-item">Crear Estado</router-link>-->
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <br>
    <vue-snotify></vue-snotify>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  @import "~bootstrap/scss/bootstrap";
  @import "~vue-snotify/styles/material";

  .router-link-exact-active {
    @extend .active;
  }
</style>
