<template>
  <div>
    <h3>Editar Oficina</h3>
    <form-office :data="office" @submit="submit"></form-office>
  </div>
</template>

<script>
  import Api from '@/services/Api'
  import Notify from '@/services/SNotify'

  export default {
    props: {},
    data () {
      return {
        office: {
          id_ubicacion: '',
          id_ciudad: '',
          nombre: '',
          direccion: '',
          lngLat: {
            longitud: '',
            latitud: ''
          },
          telefono: [
            {telefono: '', tipo: ''}
          ],
          lun_vie: [],
          horario_trabajo: {desde: '', hasta: ''},
          navideno: {desde: '', hasta: ''},
          sabados: {desde: '', hasta: ''},
          feriados: {desde: '', hasta: ''},
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
      prepareComponent () {
        this.getOffice(this.$route.params.id)
      },
      getOffice (id) {
        Api().get('office/' + id)
          .then(response => {
            this.office = response.data
          })
          .catch(error => {
            Object.entries(error.response.data.errors).forEach(
              ([key, value]) => Notify.danger('Error', value)
            )
          })
      },
      submit (formData) {
        Api().put('office/' + this.$route.params.id, formData).then(response => {
          Notify.success('Exitoso', response.data.message)
        }).catch(error => {
          Object.entries(error.response.data.errors).forEach(
            ([key, value]) => Notify.danger('Error', value)
          )
        })
      }
    },
    async mounted () {
      this.prepareComponent()
    }
  }
</script>
