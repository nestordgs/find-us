<template>
    <v-form>
      <v-text-field label="ID"
                    name="id"
                    v-model="data.id_ciudad"
                    disabled
      ></v-text-field>
      <v-text-field label="Nombre de Ciudad"
                    name="ciudadName"
                    v-model="data.ciudad"
                    required
                    :rules="nameRules"
      ></v-text-field>
      <v-text-field label="Descripcion de Ciudad"
                    name="ciudadDescription"
                    v-model="data.descripcion"
      ></v-text-field>
      <v-layout row wrap>
          <v-flex xs12 sm4>
            <v-subheader v-text="'Estado al que pertenece'"></v-subheader>
          </v-flex>
          <v-flex xs12 sm8>
            <v-select
              v-bind:items="locations"
              v-model="data.id_ubicacion"
              label="Seleccione un estado"
              single-line
              item-text="ubicacion"
              item-value="id_ubicacion"
              prepend-icon="map"
              required
            ></v-select>
          </v-flex>
        <v-flex xs12 sm6 md3 v-for="categoria in categorias" class="text-xs-left" :key="categoria.id">
          <div class="checkbox">
            <label>
              <input type="checkbox" :value="categoria.id_categoria" v-model="data.id_categoria" name="isCategory[]">
              <span class="checkbox-material"><span class="check"></span></span> {{ categoria.categoria }}
            </label>
          </div>
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
        categorias: [],
        locations: [],
        nameRules: [
          v => {
            return !!v || 'Nombre de ciudad requerido'
          },
          v => /[\s\S]{5,50}/.test(v) || 'Nombre de ciudad debe contener minimo 5 caracteres y un maximo 50 caracteres'
        ]
      }
    },
    methods: {
      prepareComponent () {
        this.getCategorys()
      },
      submit () {
        this.$emit('submit', this.data)
      },
      getCategorys () {
        Api().get('category').then(response => {
          this.categorias = response.data
        }).catch(response => {
          console.log(response)
        })
        Api().get('location').then(response => {
          this.locations = response.data
        }).catch(response => {
          console.log(response)
        })
      }
    },
    async mounted () {
      this.prepareComponent()
    }
  }
</script>
