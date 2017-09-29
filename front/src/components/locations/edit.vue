<!-- Created by Nestor on 9/10/2017. /-->
<template>
  <div class="container">
    <h3 class="text-xs-justify text-sm-center">Estado (Ubicacion) {{ $route.params.id }}</h3>
    <form-location :data="location" @submit="submit"></form-location>
  </div>
</template>

<script>
  import Api from '@/services/Api'
  import Notify from '@/services/SNotify'

  export default {
    data () {
      return {
        location: {},
        categorys: []
      }
    },
    methods: {
      prepareComponent () {
        this.getLocation(this.$route.params.id)
        this.getCategorys()
      },
      submit (formData) {
        Api().put('location/' + this.location._id, formData).then(response => {
          Notify.success('Exitoso', response.data.message)
        }).catch(error => {
          Object.entries(error.response.data.errors).forEach(
            ([key, value]) => Notify.danger('Error', value)
          )
        })
      },
      getLocation (id) {
        Api().get('location/' + id).then(response => {
          this.location = response.data[0]
          this.location.id_categoria = response.data[0].id_categoria.split(';')
        }).catch(error => {
          Object.entries(error.response.data.errors).forEach(
            ([key, value]) => Notify.danger('Error', value)
          )
        })
      },
      getCategorys () {
        Api().get('category').then(response => {
          this.categorys = response.data
        }).catch(error => {
          Object.entries(error.response.data.errors).forEach(
            ([key, value]) => Notify.danger('Error', value)
          )
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
