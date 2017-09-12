<!-- Created by Nestor on 9/9/2017. /-->
<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h3>Categoria {{ $route.params.id }}</h3>
                <form-category :data="category" @submit="submit"></form-category>
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
        category: []
      }
    },
    methods: {
      prepareComponent () {
        this.getCategory(this.$route.params.id)
      },
      getCategory (id) {
        Api().get('category/' + id).then(response => {
          this.category = response.data[0]
        }).catch(response => {
          console.log(response)
        })
      },
      submit (formData) {
        Api().put('category/' + this.category._id, formData).then(response => {
          Notify.success('Exitoso', response.data.message)
        }).catch(response => {
          Notify.danger('Error', 'Algo ha salido mal revisa la consola')
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
