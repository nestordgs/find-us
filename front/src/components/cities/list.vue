<template>
    <div>
      <h3>Ciudades</h3>
      <p class="text-xs-right">
        <router-link :to="{ name: 'CiudadesAdd'}"
                     class="indigo--text btn btn--outline btn--raised">
          <div class="btn__content">
            Crear Ciudad
          </div>
        </router-link>
      </p>
      <vue-good-table :columns="columns"
                      :rows="cities"
                      :defaultSortBy="{field: 'id_ciudad'}"
                      :paginate="true"
                      :lineNumbers="true"
                      :globalSearch="true"
                      styleClass="table table-bordered">
        <template slot="table-row" scope="props">
          <td class="text-center">{{ props.row.id_ciudad }}</td>
          <td class="text-justify">{{ props.row.ciudad }}</td>
          <td class="text-justify">
            <dialog-info :data="location" :properties="dialogPropertiesState" @execute="getLocation(props.row.id_ubicacion)"></dialog-info>
          </td>
          <td class="text-justify">
            <dialog-info :data="categorys" :properties="dialogPropertiesCategory" @execute="getCategorysArray(props.row.id_categoria)"></dialog-info>
          </td>
          <td>
            <router-link :to="{ name: 'CiudadesEdit', params: { id: props.row.id_ciudad }}"
                         class="btn btn--raised btn--small warning theme--dark">
              Edit
            </router-link>
            <v-btn small error dark @click="removeCities(props.row._id)">
              Delete
            </v-btn>
          </td>
        </template>
      </vue-good-table>
    </div>
</template>

<script>
  import Api from '@/services/Api'
  import Notify from '@/services/Snotify'
  export default {
    data () {
      return {
        columns: [
          { label: 'ID', field: 'id_ciudad', filtrable: true },
          { label: 'Name', field: 'ciudad', filtrable: true },
          { label: 'Estado (Ubicacion)', field: 'id_ubicacion', filtrable: true },
          { label: 'Utilizado en', field: 'id_categoria', filtrable: false },
          { label: '' }
        ],
        dialogPropertiesCategory: {
          titleBtn: 'Ver Categorias',
          title: 'Categoria donde se utiliza esta Ciudad',
          headers: [
            { label: 'ID de Categoria', field: 'id_categoria' },
            { label: 'Nombre', field: 'categoria' }
          ]
        },
        dialogPropertiesState: {
          titleBtn: 'Ver Estado',
          title: 'Estado donde se utiliza esta Ciudad',
          headers: [
            { label: 'Id de Estado', field: 'id_ubicacion' },
            { label: 'Nombre', field: 'ubicacion' }
          ]
        },
        cities: [],
        categorys: [],
        location: []
      }
    },
    methods: {
      prepareComponent () {
        this.getCities()
      },
      getCities () {
        Api().get('/city')
        .then(response => {
          this.cities = response.data
        })
        .catch(response => {
          Notify.danger('Error', 'Algo ha salido mal')
        })
      },
      getLocation (id) {
        Api().get('location/' + id)
        .then(response => {
          this.location = response.data
        })
        .catch(error => {
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
      removeCities (id) {
        Api().delete('/city/' + id)
          .then(response => {
            Notify.success('Exitoso', 'La ciudad ha sido eliminada con exito')
            this.getCities()
          })
          .catch(error => {
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
