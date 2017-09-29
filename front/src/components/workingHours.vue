<template>
  <v-layout row wrap>
    <v-flex xs12 sm2>
      <v-subheader><strong>{{ properties.title }}</strong></v-subheader>
    </v-flex>
    <v-flex xs6 sm5 md2>
      <v-dialog
        persistent
        v-model="modal1"
        lazy>
        <v-text-field
          slot="activator"
          label="Desde"
          v-model="data.desde"
          prepend-icon="access_time"
          readonly
          required
        ></v-text-field>
        <v-time-picker v-model="data.desde" actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
              <v-btn flat primary @click.native="save()">Save</v-btn>
            </v-card-actions>
          </template>
        </v-time-picker>
      </v-dialog>
    </v-flex>
    <v-flex xs6 sm5 md2>
      <v-dialog
        persistent
        v-model="modal2"
        lazy>
        <v-text-field
          slot="activator"
          label="Hasta"
          v-model="data.hasta"
          prepend-icon="access_time"
          readonly
          required
        ></v-text-field>
        <v-time-picker v-model="data.hasta" actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
              <v-btn flat primary @click.native="save()">Save</v-btn>
            </v-card-actions>
          </template>
        </v-time-picker>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      },
      properties: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        modal1: this.properties.modal1,
        modal2: this.properties.modal2
      }
    },
    methods: {
      prepareComponent () {}
    },
    ready () {
      this.prepareComponent()
    },
    mounted () {
      this.prepareComponent()
    }
  }
</script>
