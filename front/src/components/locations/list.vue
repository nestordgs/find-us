<!-- Created by Nestor on 9/9/2017. /-->
<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>Estados ({{ $route.name }})</h1>
                <p class="text-right">
                    <router-link :to="{ name: 'UbicacionesAdd' }"
                                 class="btn btn-outline-primary btn-sm">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Crear Ubicacion
                    </router-link>
                </p>
                <vue-good-table title="Global Filter"
                                :columns="columns"
                                :rows="locations"
                                :defaultSortBy="{field: 'id_ubicacion'}"
                                :paginate="true"
                                :lineNumbers="true"
                                :globalSearch="true"
                                styleClass="table table-bordered">
                    <template slot="table-row" scope="props">
                        <td class="text-center">{{ props.row.id_ubicacion }}</td>
                        <td class="text-justify">
                            <button type="button"
                                    class="btn btn-outline-info btn-sm"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    @click="getCategorysArray(props.row.id_categoria)">
                                Ver Categorias
                            </button>
                        </td>
                        <td class="text-justify">{{ props.row.ubicacion }}</td>
                        <td>
                            <router-link :to="{ name: 'UbicacionesEdit', params: { id: props.row.id_ubicacion }}"
                                         class="btn btn-warning btn-sm">
                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                            </router-link>
                            <button class="btn btn-danger btn-sm"
                                    @click="removeLocation(props.row._id)">
                                <i class="fa fa-trash-o" aria-hidden="true"></i> Delete
                            </button>
                        </td>
                    </template>
                </vue-good-table>
                <name-category :data="categorys"></name-category>
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
        locations: [],
        columns: [
          { label: 'ID', field: 'id_ubicacion', filtrable: true },
          { label: 'Utilizado en', field: 'id_categoria', filtrable: true },
          { label: 'Name', field: 'ubicacion', filtrable: true },
          { label: '' }
        ],
        categorys: []
      }
    },
    methods: {
      prepareComponent () {
        this.getLocations()
      },
      getLocations () {
        Api().get('location').then(response => {
          this.locations = response.data
        }).catch(response => {
          Notify.danger('Error', 'Algo ha salido mal')
          console.log(response.data)
        })
      },
      getCategorysArray (categorys) {
        Api().post('category/getIn', {opt: categorys.split(';')})
          .then(response => {
            this.categorys = response.data
          })
          .catch(response => {
            console.log(response.data)
          })
      },
      removeLocation (id) {
        Api().delete('location/' + id).then(response => {
          Notify.success('Exitoso', response.data.message)
          this.getLocations()
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