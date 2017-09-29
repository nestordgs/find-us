<template>
  <v-form>
    <v-stepper v-model="stepper">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="stepper > 1" editable>Datos de Oficina</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="stepper > 2" editable>Horarios de Oficina</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" editable>Otros Datos de Oficina</v-stepper-step>
      </v-stepper-header>

      <v-stepper-content step="1">
        <v-text-field label="Nombre de la Oficina" name="nombre" v-model="data.nombre" required
                      :rules="nameRules"></v-text-field>
        <v-text-field label="Direccion de la Oficina" name="direccion" v-model="data.direccion" required
                      :rules="addressRules"></v-text-field>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-subheader><strong>Estado donde se encuentra la oficina</strong></v-subheader>
            <v-select :items="locations" v-model="data.id_ubicacion" label="Seleccione un Estado" single-line
                      item-text="ubicacion" item-value="id_ubicacion" prepend-icon="fa-location-arrow"
                      required></v-select>
          </v-flex>
          <v-flex xs12 sm6>
            <v-subheader><strong>Ciudad donde se encuentra la oficina</strong></v-subheader>
            <v-select :items="cities" v-model="data.id_ciudad" label="Seleccione una Ciudad" single-line
                      item-text="ciudad" item-value="id_ciudad" prepend-icon="fa-map-marker" required></v-select>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <br>
        <p><strong>Ubicacion Geografica de la oficina</strong></p>
        <location-map :data="data.lngLat" :modal="false"></location-map>
        <v-divider></v-divider>
        <br>
        <p><strong>Telefonos</strong></p>
        <phone :data="data.telefono"></phone>
        <v-btn primary @click.native="stepper = 2">Continuar</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <working-hours :properties="properties1" :data="data.horario_trabajo"></working-hours>
        <v-layout row wrap>
          <v-flex xs12 sm2>
            <v-subheader><strong>Dias de Trabajo</strong></v-subheader>
          </v-flex>
          <v-flex xs4 sm2 v-for="day in days" :key="day.id">
            <v-switch :label="day.label" color="success" v-model="data.lun_vie" :value="day.value"></v-switch>
          </v-flex>
        </v-layout>
        <working-hours :properties="properties2" :data="data.navideno"></working-hours>
        <working-hours :properties="properties3" :data="data.sabados"></working-hours>
        <working-hours :properties="properties4" :data="data.feriados"></working-hours>
        <v-btn primary @click.native="stepper = 3">Continuar</v-btn>
        <v-btn flat @click.native="stepper = 1">Cancelar</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-layout row wrap>
          <v-flex xs6 sm4 md3>
            <v-switch label="Feriado Bancario" v-model="data.feriado_bancario" color="success"
                      :input-value="data.feriado_bancario" hide-details></v-switch>
          </v-flex>
          <v-flex xs6 sm4 md3>
            <v-switch label="Carnaval" color="success" v-model="data.carnaval" :input-value="data.carnaval"
                      hide-details></v-switch>
          </v-flex>
          <v-flex xs6 sm4 md3>
            <v-switch label="Semana Santa" color="success" v-model="data.semana_santa" :input-value="data.semana_santa"
                      hide-details></v-switch>
          </v-flex>
          <v-flex xs6 sm4 md3>
            <v-switch label="Impuesto" color="success" v-model="data.impuesto" :input-value="data.impuesto"
                      hide-details></v-switch>
          </v-flex>
          <v-flex xs6 sm4 md3>
            <v-switch label="Abramatic" color="success" v-model="data.abramatic" :input-value="data.abramatic"
                      hide-details></v-switch>
          </v-flex>
          <v-flex xs6 sm4 md3>
            <v-switch label="Externa" color="success" v-model="data.externa" :input-value="data.externa"
                      hide-details></v-switch>
          </v-flex>
          <v-flex xs6 sm4 md3>
            <v-switch label="Via Rapida" color="success" v-model="data.via_rapida" :input-value="data.via_rapida"
                      hide-details></v-switch>
          </v-flex>
          <v-flex xs6 sm4 md3>
            <v-switch label="Rampas" color="success" v-model="data.rampas" :input-value="data.rampas"
                      hide-details></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row justify-space-between>
          <v-flex xs3>
            <v-text-field type="number" label="N° de Cajeros en la Oficina" name="atm_ofic" v-model="data.atm_ofic"
                          required></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-text-field type="number" label="N° de Cajeros de la Ubicacion" name="atm_ubic" v-model="data.atm_ubic"
                          required></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-text-field type="number" label="N° de Cajeros Multifuncionales en la Oficina"
                          name="multifuncionales_ofic" v-model="data.multifuncionales_ofic" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn primary dark @click="submit">Guardar</v-btn>
        <v-btn flat @click.native="stepper = 2">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
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
        stepper: 0,
        locations: [],
        cities: [],
        days: [
          {label: 'Lunes', value: 'lunes'},
          {label: 'Martes', value: 'martes'},
          {label: 'Miercoles', value: 'miercoles'},
          {label: 'Jueves', value: 'jueves'},
          {label: 'Viernes', value: 'viernes'}
        ],
        properties1: {title: 'Horario de Trabajo', modal1: false, modal2: false},
        properties2: {title: 'Horario Navideño', modal1: false, modal2: false},
        properties3: {title: 'Horario Sabatino', modal1: false, modal2: false},
        properties4: {title: 'Horario Feriados', modal1: false, modal2: false},
        nameRules: [
          v => !!v || 'NOMBRE DE OFICINA REQUERIDO',
          v => /^[a-z0-9íóúáéÍÓÚÁÉ .'-]{5,50}$/i.test(v) || 'EL NOMBRE DE LA OFICINA NO ES VALIDO'
        ],
        addressRules: [
          v => !!v || 'DIRECCION DE OFICINA REQUERIDO',
          v => /^[a-z0-9íóúáéÍÓÚÁÉ ,.'-]{5,250}$/i.test(v) || 'LA DIRECCION DE LA OFICINA NO ES VALIDA'
        ]
      }
    },
    methods: {
      prepareComponent () {
        this.getOptions()
      },
      submit () {
        this.stepper = 1
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
