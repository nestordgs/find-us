<!-- Created by Nestor on 9/7/2017. /-->
<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="text-center">{{ $route.name }}</h1>
                <p class="text-right">
                    <router-link :to="{ name: 'CategoriaAdd'}"
                                 class="btn btn-outline-primary btn-sm">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Crear Categoria
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
                        <td class="text-center">{{ props.row.id_categoria }}</td>
                        <td class="text-justify">{{ props.row.categoria }}</td>
                        <td class="text-justify">{{ props.row.descripcion }}</td>
                        <td>
                            <router-link :to="{ name: 'CategoriasEdit', params: { id: props.row.id_categoria }}"
                                         class="btn btn-warning btn-sm">
                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                            </router-link>
                            <button class="btn btn-danger btn-sm"
                                    @click="removeCat(props.row._id)">
                                <i class="fa fa-trash-o" aria-hidden="true"></i> Delete
                            </button>
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
  ready () {
        this.prepareComponent()
  },
  mounted () {
        this.prepareComponent()
  }
}
</script>