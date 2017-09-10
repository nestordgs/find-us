<!-- Created by Nestor on 9/9/2017. /-->
<template>
    <form @submit.prevent="submit" novalidate v-cloak>
        <div class="form-group">
            <label for="id">ID</label>
            <input v-model="data.id_categoria" type="text" class="form-control" id="id" name="id" aria-describedby="idHelp" readonly>
            <small id="idHelp" class="form-text text-muted">El <strong>ID</strong> de Categoria debe ser unico</small>
        </div>
        <div class="form-group">
            <label for="name">Nombre de Categoria</label>
            <input v-model="data.categoria" type="text" class="form-control" id="name" placeholder="Nombre de Categoria">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
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
    return {}
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