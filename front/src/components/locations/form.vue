<!-- Created by Nestor on 9/10/2017. /-->
<template>
  <v-form>
    <v-text-field label="ID"
                  name="id"
                  v-model="data.id_ubicacion"
                  disabled
    ></v-text-field>
    <v-text-field label="Nombre de Categoria"
                  name="categoria"
                  v-model="data.ubicacion"
                  required
    ></v-text-field>
    <v-text-field label="Descripcion de Categoria"
                  name="categoria"
                  v-model="data.descripcion"
    ></v-text-field>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 v-for="categoria in categorias" class="text-xs-left" :key="categoria.id">
        <div class="checkbox">
          <label>
            <input type="checkbox" :value="categoria.id_categoria" v-model="data.id_categoria" name="isCategory[]">
            <span class="checkbox-material"><span class="check"></span></span> {{ categoria.categoria }}
          </label>
        </div>
      </v-flex>
    </v-layout>
    <v-btn primary dark @click="submit">Guardar</v-btn>
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
        categorias: []
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
