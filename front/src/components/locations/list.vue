<!-- Created by Nestor on 9/9/2017. /-->
<template>
  <div>
    <h3>Estados ({{ $route.name }})</h3>
    <p class="text-xs-right">
      <router-link :to="{ name: 'UbicacionesAdd'}"
                   class="indigo--text btn btn--outline btn--raised">
        <div class="btn__content">
          Crear Ubicacion
        </div>
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
          <dialog-info :data="categorys" :properties="dialogProperties" @execute="getCategorysArray(props.row.id_categoria)"></dialog-info>
        </td>
        <td class="text-justify">{{ props.row.ubicacion }}</td>
        <td>
          <router-link :to="{ name: 'UbicacionesEdit', params: { id: props.row.id_ubicacion }}"
                       class="btn btn--raised btn--small warning theme--dark">
            Edit
          </router-link>
          <v-btn small error dark @click="removeLocation(props.row._id)">
            Delete
          </v-btn>
        </td>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
  import Api from '@/services/Api'
  import Notify from '@/services/SNotify'
  export default {
    data () {
      return {
        columns: [
          { label: 'ID', field: 'id_ubicacion', filtrable: true },
          { label: 'Utilizado en', field: 'id_categoria', filtrable: false },
          { label: 'Name', field: 'ubicacion', filtrable: true },
          { label: '' }
        ],
        dialogProperties: {
          titleBtn: 'Ver Categoria',
          title: 'Categoria donde se utiliza este Estado (Ubicación)',
          headers: [
            { text: 'Id de Categoria', align: 'left', value: 'id_categoria' },
            { text: 'Nombre', align: 'left', value: 'categoria' }
          ]
        },
        locations: [],
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
        }).catch(error => {
          Object.entries(error.response.data.errors).forEach(
            ([key, value]) => Notify.danger('Error', value)
          )
        })
      },
      getCategorysArray (categorys) {
        Api().post('category/getIn', { opt: categorys.split(';') })
          .then(response => {
            this.categorys = response.data
          })
          .catch(error => {
            Object.entries(error.response.data.errors).forEach(
              ([key, value]) => Notify.danger('Error', value)
            )
          })
      },
      removeLocation (id) {
        Api().delete('location/' + id).then(response => {
          Notify.success('Exitoso', response.data.message)
          this.getLocations()
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
