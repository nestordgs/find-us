<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm5>
        <v-text-field label="Longitud" name="longitud" id="longitud" v-model="data.longitud" :rules="lngRules" v-on:keyup="longitud"></v-text-field>
      </v-flex>
      <v-flex xs12 sm5 offset-sm1>
        <v-text-field label="Latitud" name="latitud" id="latitud" v-model="data.latitud" required :rules="latRules" v-on:keyup="latitud"></v-text-field>
      </v-flex>
      <v-card-text style="position: relative">
        <v-btn v-tooltip:left="{ html: 'Ver Ubicacion en el Mapa' }" absolute dark outline fab top right class="indigo btn--small" @click="showMap(data.longitud,data.latitud)">
          <v-icon class="blue-grey--text text--darken-2">fa-map-marker</v-icon>
        </v-btn>
      </v-card-text>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <gmap-map
          transition="slide-x-transition"
          :style="currentStyle"
          :center="center"
          :zoom="18"
          map-type-id="terrain"
          :resize-bus="customBus"
        >
          <gmap-marker
            :if="position"
            :position="position"
            :clickable="false"
            :draggable="false"
          ></gmap-marker>
        </gmap-map>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Notify from '@/services/SNotify'
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        customBus: new Vue(),
        currentStyle: { display: 'none', opacity: 0 },
        center: { lat: 8.4680932, lng: -66.8878207 },
        position: null,
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
      },
      showMap (lng, lat) {
        if (lng !== '' && lat !== '') {
          this.currentStyle = { display: 'inline-block', width: '100%', height: '200px' }
          this.center = { lng: parseFloat(lng), lat: parseFloat(lat) }
          this.position = { lng: parseFloat(lng), lat: parseFloat(lat) }
          this.customBus.$emit('resize')
        } else {
          Notify.danger('Error', 'Debe ingresar la Longitud y Latitud')
        }
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
