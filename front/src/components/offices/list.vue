<template>
    <div>
      <h3>Oficinas</h3>
      <p class="text-xs-right">
        <router-link :to="{ name: 'OficinasAdd'}"
                     class="indigo--text btn btn--outline btn--raised">
          <div class="btn__content">
            Crear Oficina
          </div>
        </router-link>
      </p>
      <vue-good-table :columns="columns"
                      :rows="offices"
                      :defaultSortBy="{field: 'id_ubicacion'}"
                      :paginate="true"
                      :lineNumbers="true"
                      :globalSearch="true"
                      styleClass="table table-bordered">
        <template slot="table-row" scope="props">
          <td class="text-center">
            <dialog-info :data="location" :properties="dialogPropertiesState" @execute="getLocation(props.row.id_ubicacion)"></dialog-info>
          </td>
          <td class="text-center">
            <dialog-info :data="city" :properties="dialogPropertiesCity" @execute="getCity(props.row.id_ciudad)"></dialog-info>
          </td>
          <td class="text-justify">{{ props.row.nombre }}</td>
          <td class="text-justify">
            {{ props.row.direccion }}
          </td>
          <td class="text-center">{{ props.row.longitud }}</td>
          <td class="text-center">{{ props.row.latitud }}</td>
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
  import Notify from '@/services/SNotify'
  export default {
    data () {
      return {
        columns: [
          { label: 'Ubicacion', field: 'id_ubicacion', filtrable: true },
          { label: 'Ciudad', field: 'id_ciudad', filtrable: true },
          { label: 'Nombre', field: 'nombre', filtrable: true },
          { label: 'Direccion', field: 'direccion', filtrable: true },
          { label: 'Longitud', field: 'longitud', filtrable: true },
          { label: 'Latitud', field: 'latitud', filtrable: true },
          { label: '' }
        ],
        dialogPropertiesState: {
          titleBtn: 'Ver Estado',
          title: 'Estado donde se utiliza esta Ciudad',
          headers: [
            { label: 'Id de Estado', field: 'id_ubicacion' },
            { label: 'Nombre', field: 'ubicacion' }
          ]
        },
        dialogPropertiesCity: {
          titleBtn: 'Ver Ciudad',
          title: 'Ciudad donde se utiliza esta Oficina',
          noItems: 'No existe la Ciudad',
          headers: [
            { label: 'ID de Ciudad', field: 'id_ciudad' },
            { label: 'Nombre', field: 'ciudad' }
          ]
        },
        offices: [],
        location: [],
        city: []
      }
    },
    methods: {
      prepareComponent () {
        this.getOffices()
      },
      getOffices () {
        Api().get('office')
          .then(response => {
            this.offices = response.data
          })
          .catch(error => {
            Object.entries(error.response.data.errors).forEach(
              ([key, value]) => Notify.danger('Error', value)
            )
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
      getCity (id) {
        Api().get('city/' + id)
          .then(response => {
            this.city = response.data
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
