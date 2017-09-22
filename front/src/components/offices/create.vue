<template>
    <div>
      <h3>Crear Nueva Oficina</h3>
      <form-office :data="office" @submit="submit"></form-office>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        office: {
          id_ubicacion: '',
          id_ciudad: '',
          nombre: '',
          direccion: '',
          longitud: '',
          latitud: '',
          telefono: '',
          navideno: '',
          lun_vie: '',
          sabados: '',
          feriados: '',
          lun_vie_externos: '',
          sabados_feriados_externas: '',
          feriado_bancario: false,
          carnaval: false,
          semana_santa: false,
          impuesto: false,
          abramatic: false,
          externa: false,
          via_rapida: false,
          rampas: false,
          atm_ofic: 0,
          atm_ubic: 0,
          multifuncionales_ofic: 0
        }
      }
    },
    methods: {
      prepareComponent () {},
      submit (formData) {
        console.log(formData)
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
