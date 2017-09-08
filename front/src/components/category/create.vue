<!-- Created by Nestor on 9/7/2017. /-->
<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <!--<div class="card text-white bg-dark mb-3">
                    <div class="card-header">{{ $route.name }}</div>
                    <div class="card-body">
                        <h4 class="card-title">Dark card title</h4>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>-->
                <h1 class="text-center">{{ $route.name }}</h1>
                <table class="table">
                    <thead class="thead-inverse">
                        <tr>
                            <th v-for="categoria in categorias" class="text-center">{{ categoria }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="category in categorys">
                            <td class="text-center">{{ category.id_categoria }}</td>
                            <td class="text-justify">{{ category.categoria }}</td>
                            <td class="">{{ (category.descripcion == '' || category.descripcion == null) ? 'no description' : category.descripcion }}</td>
                            <td>
                                <button class="btn btn-warning">Edit</button>
                                <button class="btn btn-danger" @click="removeCat(category.id_categoria)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Api from '@/services/Api'
export default {
  data () {
        return {
          categorys: [],
          categorias: ['#', 'Name', 'Descripcion', '']
        }
  },
  methods: {
        consultar () {
          Api().get('category').then(response => {
            this.categorys = response.data
//            console.log(response.data)
          }).catch(response => {
            console.log(response)
          })
        },
        prepareComponent () {
          this.consultar()
        },
        removeCat (id) {
          Api().delete('category/' + id).then(response => {
            alert(response.data)
            this.consultar()
          }).catch(response => {
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