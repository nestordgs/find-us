<template>
  <div>
    <h3>Crear Nueva Oficina</h3>
    <form-office :data="office" @submit="submit"></form-office>
  </div>
</template>

<script>
  import Api from '@/services/Api'
  import Notify from '@/services/SNotify'

  export default {
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
          horario_trabajo: {desde: null, hasta: null},
          navideno: {desde: null, hasta: null},
          sabados: {desde: null, hasta: null},
          feriados: {desde: null, hasta: null},
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
      submit (formData) {
        console.log(formData)
        Api().post('office/', formData).then(response => {
          Notify.success('Exitoso', response.data.message)
          this.resetForm()
          this.getLastVal()
        }).catch(error => {
          Object.entries(error.response.data.errors).forEach(
            ([key, value]) => Notify.danger('Error', value)
          )
        })
      },
      resetForm () {
        this.office = {
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
          horario_trabajo: {desde: null, hasta: null},
          navideno: {desde: null, hasta: null},
          sabados: {desde: null, hasta: null},
          feriados: {desde: null, hasta: null},
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
    }
  }
</script>
