<template>
    <div class="container">
      <h3>Ciudades</h3>
      <p class="text-xs-right">
        <router-link :to="{ name: 'CiudadesAdd'}"
                     class="indigo--text btn btn--outline btn--raised">
          <div class="btn__content">
            Crear Ciudad
          </div>
        </router-link>
      </p>
      <vue-good-table title="Global Filter"
                      :columns="columns"
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
            <!-- <v-btn outline class="indigo--text" @click="getLocation(props.row.id_ubicacion)">Ver Estado</v-btn> -->
            <dialog-info :data="location" :id="props.row.id_ubicacion" :properties="dialogPropertiesState"></dialog-info>
          </td>
          <td class="text-justify">
            <!-- <v-btn outline class="indigo--text" @click="getCategorysArray(props.row.id_categoria)">Ver Categorias</v-btn> -->
            <dialog-info :data="categorys" :id="props.row.id_ubicacion" :properties="dialogPropertiesCategory"></dialog-info>
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


      <!-- <v-dialog v-model="dialogCategorys">
        <v-card>
          <v-card-title class="headline">Categoria donde se utiliza esta Ciudad</v-card-title>
          <v-data-table
            :headers="headersCategory"
            :items="categorys"
            hide-actions
            class="elevation-1">
            <template slot="items" scope="props">
              <td class="text-xs-center"><strong>{{ props.item.id_categoria }}</strong></td>
              <td class="text-xs-justify">{{ props.item.categoria }}</td>
            </template>
          </v-data-table>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialogCategorys = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->


      <!-- <v-dialog v-model="dialogState" persistent width="30%">
        <v-card>
          <v-card-title class="headline">Estado donde se utiliza esta Ciudad</v-card-title>
          <v-data-table
            :headers="headersState"
            :items="location"
            hide-actions
            class="elevation-1">
            <template slot="items" scope="props">
              <td class="text-xs-center"><strong>{{ props.item.id_ubicacion}}</strong></td>
              <td class="text-xs-justify">{{ props.item.ubicacion }}</td>
            </template>
          </v-data-table>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialogState = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->

      <!-- <dialog-info :properties="dialogPropertiesCategory"></dialog-info>
      <dialog-info :properties="dialogPropertiesState"></dialog-info> -->
    </div>
</template>

<script>
  import Api from '@/services/Api'
  import Notify from '@/services/Snotify'
  export default {
    data () {
      return {
        cities: [],
        columns: [
          { label: 'ID', field: 'id_ciudad', filtrable: true },
          { label: 'Name', field: 'ciudad', filtrable: true },
          { label: 'Estado (Ubicacion)', field: 'id_ubicacion', filtrable: true },
          { label: 'Utilizado en', field: 'id_categoria', filtrable: false },
          { label: '' }
        ],
        categorys: [],
        location: [],
        dialogPropertiesCategory: {
          state: false,
          dialog: false,
          titleBtn: 'Ver Categorias',
          route: 'category/getIn',
          title: 'Categoria donde se utiliza esta Ciudad',
          headers: [
            { text: 'ID de Categoria', align: 'left', value: 'id_categoria' },
            { text: 'Nombre', align: 'left', value: 'categoria' }
          ]
        },
        dialogPropertiesState: {
          state: true,
          dialog: false,
          titleBtn: 'Ver Estado',
          route: 'location/',
          title: 'Estado donde se utiliza esta Ciudad',
          headers: [
            { text: 'Id de Estado', align: 'left', value: 'id_ubicacion' },
            { text: 'Nombre', align: 'left', value: 'ubicacion' }
          ]
        }
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
          this.dialogState = true
        })
        .catch(response => {
          Notify.danger('Error', 'Algo ha salido mal')
        })
      },
      getCategorysArray (categorys) {
        Api().post('category/getIn', { opt: categorys.split(';') })
          .then(response => {
            this.categorys = response.data
            this.dialogCategorys = true
          })
          .catch(response => {
            console.log(response.data)
          })
      },
      removeCities (id) {
        Api().delete('/city/' + id)
          .then(response => {
            Notify.success('Exitoso', 'La ciudad ha sido eliminada con exito')
            this.getCities()
          })
          .catch(response => {
            Notify.danger('Error', 'Algo ha salido mal')
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
