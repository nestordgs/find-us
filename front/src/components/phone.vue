<template>
  <div>
    <v-card-text style="position: relative">
      <v-btn v-tooltip:left="{ html: 'Agregar nuevo Telefono' }" absolute dark outline fab top right
             class="indigo btn--small" @click="addPhone">
        <v-icon class="blue-grey--text text--darken-2">add</v-icon>
      </v-btn>
    </v-card-text>
    <v-layout row v-for="(phone, index) in data" :key="phone.id">
      <v-flex xs12 sm5>
        <v-text-field label="Numero de Telefono" name="phone[]" v-model="phone.telefono" :id="'telefono_' + index"
                      prepend-icon="phone" required :rules="phoneRules"></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 offset-sm1>
        <v-select v-model="phone.tipo" :items="typePhone" :id="'typePhone_' + index" name="typePhone[]"
                  label="Tipo de Telefono" item-text="label" item-value="value" required>
        </v-select>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        typePhone: [
          {label: 'Telefono', value: 'telefono'},
          {label: 'Fax', value: 'Fax'}
        ],
        phoneRules: [
          v => !!v || 'EL TELEFONO ES REQUERIDO',
          v => /\(?\+?\d{3,5}\)?-?\d{7}$/.test(v) || 'EL TELEFONO NO TIENE EL FORMATO CORRECTO'
        ]
      }
    },
    methods: {
      prepareComponent () {
      },
      addPhone () {
        this.data.push({telefono: '', tipo: ''})
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
