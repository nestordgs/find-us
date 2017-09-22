<template>
  <v-form>
    <v-text-field label="Nombre de Ciudad"
                  name="nombre"
                  v-model="data.nombre"
                  required
    ></v-text-field>
    <v-text-field label="Descripcion de Ciudad"
                  name="direccion"
                  v-model="data.direccion"
                  required
    ></v-text-field>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-text-field label="Longitud"
                      name="longitud"
                      v-model="data.id_ubicacion"
                      required
        ></v-text-field>
        <v-text-field label="Latitud"
                      name="latitud"
                      v-model="data.latitud"
                      required
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-subheader v-text="'Estado donde se encuentra la oficina'"></v-subheader>
        <v-select
          :items="locations"
          v-model="data.id_ubicacion"
          label="Seleccione un Estado"
          single-line
          item-text="ubicacion"
          item-value="id_ubicacion"
          prepend-icon="map"
          required
        ></v-select>
      </v-flex>
      <v-flex xs12 sm6>
        <v-subheader v-text="'Ciudad donde se encuentra la oficina'"></v-subheader>
        <v-select
          :items="cities"
          v-model="data.id_ciudad"
          label="Seleccione una Ciudad"
          single-line
          item-text="ciudad"
          item-value="id_ciudad"
          prepend-icon="map"
          required
        ></v-select>
      </v-flex>
    </v-layout>
    <v-btn primary dark @click="submit">Submit</v-btn>
  </v-form>
</template>

<script>
  import Api from '@/services/Api'
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        locations: [],
        cities: []
      }
    },
    methods: {
      prepareComponent () {
        this.getOptions()
      },
      submit () {
        this.$emit('submit', this.data)
      },
      getOptions () {
        Api().get('location').then(response => {
          this.locations = response.data
        }).catch(response => {
          console.log(response)
        })
        Api().get('city').then(response => {
          this.cities = response.data
        }).catch(response => {
          console.log(response)
        })
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
