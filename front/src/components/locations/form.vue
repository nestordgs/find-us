<!-- Created by Nestor on 9/10/2017. /-->
<template>
    <form @submit.prevent="submit" novalidate v-cloak>
        <div class="form-group text-left">
            <label for="id"><strong>ID</strong></label>
            <input v-model="data.id_ubicacion" type="text" class="form-control" id="id" name="id" aria-describedby="idHelp" readonly>
            <small id="idHelp" class="form-text text-muted">El <strong>ID</strong> de Ubicacion debe ser unico</small>
        </div>
        <div class="form-group text-left">
            <label for="name"><strong>Nombre de Ubicacion</strong></label>
            <input v-model="data.ubicacion" type="text" class="form-control" id="name" placeholder="Nombre de Categoria">
        </div>
        <br>
        <div class="form-group text-justify">
            <p class="text-left">
                <strong>Seleccione las categorias en la cual podra ser utilizada</strong>
            </p>
            <label class="custom-control custom-checkbox" v-for="item in cat">
                <input type="checkbox"
                       class="custom-control-input"
                       :value="item.id_categoria"
                       v-model="data.id_categoria"
                       name="isCategory[]">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">{{ item.categoria }}</span>
            </label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
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
        cat: []
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
          this.cat = response.data
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