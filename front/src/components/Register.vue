<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <h3>Registro de Usuarios</h3>
      <form
        name="tab-tracker-form"
        autocomplete="off">
        <v-text-field
          label="Nombre"
          v-model="nombre"
          required
        ></v-text-field>
        <br>
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
        @click="register">
        Registrarse
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
      async register () {
        try {
          await AuthenticationService.register({
            nombre: this.nombre,
            email: this.email,
            password: this.password
          })
          this.resetForm()
          Notify.success('Felicidades', 'Registro Realizado exitosamente')
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
    }
  }
</script>
