<!-- Created by Nestor on 9/7/2017. /-->
<template>
  <div>
    <div class="row">
      <div class="col">
        <h3 class="text-center">{{ $route.name }}</h3>
        <p class="text-lg-right text-xs-right text-sm-right text-md-right">
          <router-link :to="{ name: 'CategoriaAdd'}"
                       class="indigo--text btn btn--outline btn--raised">
            <div class="btn__content">
              Crear Categoria
            </div>
          </router-link>
        </p>
        <vue-good-table title="Global Filter"
                        :columns="columns"
                        :rows="categorys"
                        :defaultSortBy="{field: 'id_categoria'}"
                        :paginate="true"
                        :lineNumbers="true"
                        :globalSearch="true"
                        styleClass="table table-bordered">
          <template slot="table-row" scope="props">
            <td class="text-lg-center text-sm-center text-xs-center text-md-center">{{ props.row.id_categoria }}</td>
            <td class="text-lg-justify text-sm-justify text-xs-justify text-md-justify">{{ props.row.categoria }}</td>
            <td class="text-lg-justify text-sm-justify text-xs-justify text-md-justify">{{ props.row.descripcion | description }}</td>
            <td>
              <router-link :to="{ name: 'CategoriasEdit', params: { id: props.row.id_categoria }}"
                           class="btn btn--raised btn--small warning theme--dark">
                Edit
              </router-link>
              <v-btn small error dark @click="removeCat(props.row._id)">
                Delete
              </v-btn>
            </td>
          </template>
        </vue-good-table>
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
        categorys: [],
        columns: [
          { label: 'ID', field: 'id_categoria', filtrable: true },
          { label: 'Name', field: 'categoria', filtrable: true },
          { label: 'Descripcion', field: 'descripcion' },
          { label: '' }
        ]
      }
    },
    methods: {
      prepareComponent () {
        this.consultar()
      },
      consultar () {
        Api().get('category').then(response => {
          this.categorys = response.data
        }).catch(response => {
          console.log(response)
        })
      },
      removeCat (id) {
        Api().delete('category/' + id).then(response => {
          Notify.success('Exitoso', response.data.message)
          this.consultar()
        }).catch(response => {
          console.log(response.data)
        })
      }
    },
    filters: {
      description (str) {
        return str.length === 0 ? 'Sin Descripcion' : str
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
