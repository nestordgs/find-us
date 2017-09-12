<!-- Created by Nestor on 9/9/2017. /-->
<template>
  <div class="container">
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
              <!--<v-btn outline class="indigo&#45;&#45;text" @click.native.stop="dialog = true;getCategorysArray(props.row.id_categoria)">Open Dialog</v-btn>-->
          <v-btn outline class="indigo--text" @click="getCategorysArray(props.row.id_categoria)">Open Dialog</v-btn>
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
    <v-dialog v-model="dialog" persistent width="50%">
      <v-card>
        <v-card-title class="headline text-xs-left">Categoria donde se utiliza este Estado (Ubicación)</v-card-title>
        <v-data-table
          :headers="headers"
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
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          { label: 'Utilizado en', field: 'id_categoria', filtrable: false },
          { label: 'Name', field: 'ubicacion', filtrable: true },
          { label: '' }
        ],
        categorys: [],
        dialog: false,
        headers: [
          { text: 'Id de Categoria', align: 'left', value: 'id_categoria' },
          { text: 'Nombre', align: 'left', value: 'categoria' }
        ],
        open: false
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
        Api().post('category/getIn', { opt: categorys.split(';') })
          .then(response => {
            this.categorys = response.data
            this.dialog = true
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
