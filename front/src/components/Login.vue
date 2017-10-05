<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <h3>Inicio de Sesion</h3>
      <form
        name="tab-tracker-form">
        <v-text-field
          label="Correo Electronico"
          v-model="email"
          required
        ></v-text-field>
        <br>
        <v-text-field
          label="Contraseña"
          type="password"
          v-model="password"
          autocomplete="new-password"
          required
        ></v-text-field>
      </form>
      <br>
      <v-btn
        dark
        class="cyan"
        @click="login">
        Iniciar Sesion
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  import Notify from '@/services/SNotify'
  export default {
    data () {
      return {
        nombre: '',
        email: '',
        password: ''
      }
    },
    methods: {
      prepareComponent () {},
      async login () {
        try {
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({
            name: 'Hello'
          })
        } catch (error) {
          Object.entries(error.response.data.errors).forEach(
            ([key, value]) => Notify.danger('Error', value)
          )
        }
      },
      resetForm () {
        this.nombre = ''
        this.email = ''
        this.password = ''
      }
    },
    ready () {
      this.prepareComponent()
    },
    mounted () {
      this.prepareComponent()
    }
  }
</script>
