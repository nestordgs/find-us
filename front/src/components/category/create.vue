<!-- Created by Nestor on 9/9/2017. /-->
<template>
  <div class="container">
    <h3>Crear Nueva Categoria</h3>
    <form-category :data="category" @submit="submit"></form-category>
  </div>
</template>

<script>
  import Api from '@/services/Api'
  import Notify from '@/services/SNotify'

  export default {
    data () {
      return {
        category: {
          descripcion: '',
          categoria: '',
          id_categoria: ''
        }
      }
    },
    methods: {
      prepareComponent () {
        this.getLastVal()
      },
      submit (formData) {
        Api().post('category/', formData).then(response => {
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
        Api().post('/category/getLast').then(response => {
          this.category.id_categoria = response.data.id
        })
      },
      resetForm () {
        this.category = {
          descripcion: '',
          categoria: '',
          id_categoria: ''
        }
      }
    },
    async mounted () {
      this.prepareComponent()
    }
  }
</script>
