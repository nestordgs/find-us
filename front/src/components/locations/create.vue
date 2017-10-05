<!-- Created by Nestor on 9/10/2017. /-->
<template>
  <div class="container">
    <h3>Crear Nuevo Estado (Ubicacion)</h3>
    <form-location :data="location" @submit="submit"></form-location>
  </div>
</template>

<script>
  import Api from '@/services/Api'
  import Notify from '@/services/SNotify'
  export default {
    data () {
      return {
        location: {
          id_categoria: [],
          id_ubicacion: '',
          ubicacion: ''
        }
      }
    },
    methods: {
      prepareComponent () {
        this.getLastVal()
      },
      submit (formData) {
        Api().post('location/', formData).then(response => {
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
        Api().post('/location/getLast').then(response => {
          this.location.id_ubicacion = response.data.id
        })
      },
      resetForm () {
        this.location = {
          id_categoria: [],
          id_ubicacion: '',
          ubicacion: ''
        }
      }
    },
    async mounted () {
      this.prepareComponent()
    }
  }
</script>
