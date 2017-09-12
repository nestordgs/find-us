<!-- Created by Nestor on 9/9/2017. /-->
<template>
  <v-form>
    <v-text-field label="ID"
                  name="id"
                  v-model="data.id_categoria"
                  disabled
    ></v-text-field>
    <v-text-field label="Nombre de Categoria"
                  name="categoria"
                  v-model="data.categoria"
                  :rules="categoriaRules"
                  required
    ></v-text-field>
    <v-text-field label="Descripcion de Categoria"
                  name="categoria"
                  v-model="data.descripcion"
    ></v-text-field>
    <v-btn primary dark @click="submit">Submit</v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      categoriaRules: [
        v => {
          return !!v || 'Nombre de categoria requerido'
        },
        v => /[\s\S]{5,50}/.test(v) || 'Nombre de categoria debe contener minimo 5 caracteres y un maximo 50 caracteres'
      ]
    }
  },
  methods: {
    prepareComponent () {

    },
    submit () {
      let formData = new FormData()

      formData.set('_id', this.data._id)
      formData.set('id', this.data.id_categoria)
      formData.set('name', this.data.categoria)
      formData.set('descripcion', this.data.descripcion)

      this.$emit('submit', this.data)
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
