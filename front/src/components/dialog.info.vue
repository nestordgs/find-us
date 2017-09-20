<!-- Created by Nestor on 9/10/2017. /-->
<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent>
        <v-btn outline class="indigo--text btn--small" slot="activator" @click="showModal">{{ properties.titleBtn }}</v-btn>
        <v-card>
          <v-card-title class="headline">{{ properties.title }}</v-card-title>
          <v-data-table
            :headers="properties.headers"
            :items="data"
            hide-actions
            class="elevation-1">
            <template slot="items" scope="props">
              <td class="text-xs-center">
                <strong>
                  {{ (props.item.id_ubicacion) ? props.item.id_ubicacion : props.item.id_categoria }}
                </strong>
              </td>
              <td class="text-xs-justify">
                {{ (props.item.ubicacion) ? props.item.ubicacion  : props.item.categoria }}
              </td>
            </template>
          </v-data-table>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  export default {
    props: {
      properties: {
        type: Object,
        required: true
      },
      data: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        dialog: this.properties.dialog
      }
    },
    methods: {
      prepareComponent () {},
      showModal () {
        this.$emit('execute')
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
