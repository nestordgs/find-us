<template>
  <v-layout row wrap>
    <v-flex d-flex xs12 sm4>
      <v-text-field label="Longitud" name="longitud" id="longitud" v-model="data.longitud" :rules="lngRules" v-on:keyup="longitud"></v-text-field>
    </v-flex>
    <v-flex d-flex xs12 sm4 offset-sm1>
      <v-text-field label="Latitud" name="latitud" id="latitud" v-model="data.latitud" required :rules="latRules" v-on:keyup="latitud"></v-text-field>
    </v-flex>
    <v-flex d-flex xs1>
      <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
        <v-btn outline ml-5 class="indigo--text btn--small" slot="activator">Ver Ubicación</v-btn>
        <v-card>
          <v-toolbar dark class="indigo darken-4">
            <v-btn icon @click.native="dialog = false" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>
              <v-chip class="secondary white--text">
                Longitud: {{ data.longitud }}
              </v-chip>
              <v-chip class="secondary white--text">
                Latitud: {{ data.latitud }}
              </v-chip>
            </v-toolbar-title>
          </v-toolbar>
          Aqui va Mapa de Google
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        test2: 0,
        dialog: this.modal,
        lngRules: [
          v => !!v || 'ESTE CAMPO ES REQUERIDO',
          v => /^-?[0-9]{1,2}.[0-9]+$/gi.test(v) || 'LA LONGITUD NO TIENE EL FORMATO CORRECTO'
        ],
        latRules: [
          v => !!v || 'ESTE CAMPO ES REQUERIDO',
          v => /^-?[0-9]{1,2}.[0-9]+$/gi.test(v) || 'LA LATITUD NO TIENE EL FORMATO CORRECTO'
        ]
      }
    },
    methods: {
      prepareComponent () {},
      longitud () {
        this.data.longitud = this.data.longitud.replace(/[^0-9.-]/gi, '')
      },
      latitud () {
        this.data.latitud = this.data.latitud.replace(/[^0-9.-]/gi, '')
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
