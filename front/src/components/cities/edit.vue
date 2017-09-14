<template>
    <div class="container">
      <h3>Editar Ciudad {{ $route.params.id }}</h3>
      <form-city :data="city" @submit="submit"></form-city>
    </div>
</template>

<script>
  import Api from '@/services/Api'
  import Notify from '@/services/SNotify'
  export default {
    data () {
      return {
        city: {}
      }
    },
    methods: {
      prepareComponent () {
        this.getCity(this.$route.params.id)
      },
      getCity (id) {
        Api().get('city/' + id)
          .then(response => {
            this.city = response.data[0]
            this.city.id_categoria = response.data[0].id_categoria.split(';')
          })
          .catch(response => {
            console.log(response.data)
          })
      },
      submit (formData) {
        Api().put('city/' + this.city._id, formData).then(response => {
          Notify.success('Exitoso', response.data.message)
        }).catch(response => {
          Notify.danger('Error', 'Algo ha salido mal')
          console.log(response.data)
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
