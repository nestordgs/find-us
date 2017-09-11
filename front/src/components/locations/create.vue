<!-- Created by Nestor on 9/10/2017. /-->
<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>Crear Nuevo Estado (Ubicacion)</h1>
                <form-location :data="location" @submit="submit"></form-location>
            </div>
        </div>
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
        }).catch(response => {
          Notify.danger('Error', 'Algo ha salido mal')
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
    ready () {
      this.prepareComponent()
    },
    mounted () {
      this.prepareComponent()
    }
  }
</script>