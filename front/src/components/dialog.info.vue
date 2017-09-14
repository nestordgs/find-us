<!-- Created by Nestor on 9/10/2017. /-->
<template>
    <div>
        <v-btn outline class="indigo--text" @click.native.stop="dialog = true;getInfo(id)">{{ properties.titleBtn }}</v-btn>
        <v-dialog v-model="dialog" width="30%">
        <v-card>
          <v-card-title class="headline">{{ properties.title }}</v-card-title>
          <v-data-table
            :headers="properties.headers"
            :items="values"
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
  import Notify from '@/services/Snotify'
  export default {
    props: {
      properties: {
        type: Object,
        required: true
      },
      data: {
        type: Array,
        required: true
      },
      id: {
        required: true
      }
    },
    data () {
      return {
        dialog: this.properties.dialog,
        values: this.data
      }
    },
    methods: {
      prepareComponent () {
        console.log(this.data)
      },
      getInfo (id) {
        if (this.properties.state) {
          Api().get(this.properties.route + this.id)
            .then(response => {
              this.data = response.data
              this.dialogState = true
            })
            .catch(response => {
              Notify.danger('Error', 'Algo ha salido mal')
            })
        } else {
          Api().post(this.properties.route)
            .then(response => {
              this.data = response.data
              this.dialogState = true
            })
            .catch(response => {
              Notify.danger('Error', 'Algo ha salido mal')
            })
        }
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