<template>
  <v-layout column>
    <v-flex xs12 sm8 offset-sm2>
      <h3>Registro de Usuarios</h3>
      <form
        name="tab-tracker-form"
        autocomplete="off">
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              label="Nombre"
              v-model="nombre"
              required
              :rules="required"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              label="Correo Electronico"
              v-model="email"
              required
              :rules="required"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              label="Contraseña"
              type="password"
              v-model="password"
              autocomplete="new-password"
              required
              :rules="required"
            ></v-text-field>
          </v-flex>
        </v-layout>
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
        password: '',
        required: [
          v => !!v || 'ESTE CAMPO ES REQUERIDO'
        ]
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
          this.$router.push({name: 'login'})
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
