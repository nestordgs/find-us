<!-- Created by Nestor on 9/10/2017. /-->
<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>Estado (Ubicacion) {{ $route.params.id }}</h1>
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
        }).catch(response => {
          Notify.danger('Error', 'Algo ha salido mal')
          console.log(response.data)
        })
      },
      getLocation (id) {
        Api().get('location/' + id).then(response => {
          this.location = response.data[0]
          this.location.id_categoria = response.data[0].id_categoria.split(';')
        }).catch(response => {
          Notify.danger('Error', 'Algo ha salido mal')
        })
      },
      getCategorys () {
        Api().get('category').then(response => {
          this.categorys = response.data
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