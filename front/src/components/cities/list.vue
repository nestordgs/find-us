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
    </div>
</template>

<script>
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
        ]
      }
    },
    methods: {
      prepareComponent () {

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
