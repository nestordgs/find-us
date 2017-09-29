<!-- Created by Nestor on 9/10/2017. /-->
<template>
  <div class="container">
    <h3>Crear Nueva Ciudad</h3>
    <form-city :data="citie" @submit="submit"></form-city>
  </div>
</template>

<script>
  import Api from '@/services/Api'
  import Notify from '@/services/SNotify'

  export default {
    data () {
      return {
        citie: {
          id_categoria: [],
          id_ubicacion: null,
          id_ciudad: '',
          ciudad: ''
        }
      }
    },
    methods: {
      prepareComponent () {
        this.getLastVal()
      },
      submit (formData) {
        Api().post('city/', formData).then(response => {
          Notify.success('Exitoso', response.data.message)
          this.resetForm()
          this.getLastVal()
        }).catch(error => {
          Object.entries(error.response.data.errors).forEach(
            ([key, value]) => Notify.danger('Error', value)
          )
        })
      },
      getLastVal () {
        Api().post('/city/getLast').then(response => {
          this.citie.id_ciudad = response.data.id
        })
      },
      resetForm () {
        this.citie = {
          id_categoria: [],
          id_ubicacion: null,
          id_ciudad: '',
          ciudad: ''
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
