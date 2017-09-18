const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfficeSchema = new Schema({
  id_ubicacion: {
    type: Number,
    required: 'ID ubicacion es requerido'
  },
  id_ciudad: {
    type: Number,
    required: 'ID ciudad es requerido'
  },
  nombre: {
    type: String,
    required: 'Nombre oficina es requerido'
  },
  direccion: {
    type: String,
    required: 'Direccion oficina es requerido'
  },
  longitud: {
    type: Number,
    required: 'longitud oficina es requerido'
  },
  latitud: {
    type: Number,
    required: 'latitud oficina es requerido'
  },
  telefono: {
    type: String,
  },
  navideno: {
    type: String,
    default: ''
  },
  lun_vie: {
    type: String,
    required: 'Horario de lunes a viernes es requerido'
  },
  sabados: {
    type: String,
    default: ''
  },
  feriados: {
    type: String,
    default: ''
  },
  lun_vie_externas: {
    type: String,
    default: ''
  },
  sabados_feriados_externas: {
    type: String,
    default: ''
  },
  feriado_bancario: {
    type: Boolean,
    default: false
  },
  carnaval: {
    type: Boolean,
    default: false
  },
  semana_santa: {
    type: Boolean,
    default: false
  },
  impuesto: {
    type: Boolean,
    default: false
  },
  abramatic: {
    type: Boolean,
    default: false
  },
  externa: {
    type: Boolean,
    default: false
  },
  via_rapida: {
    type: Boolean,
    default: false
  },
  rampas: {
    type: Boolean,
    default: false
  },
  atm_ofic: {
    type: Number,
    default: 0
  },
  atm_ubic: {
    type: Number,
    default: 0
  },
  multifuncionales_ofic: {
    type: Number,
    default: 0
  }
}, {timestamps: true})

OfficeSchema.statics = {
  /**
   * List cities in ascending order of 'createdAt'.
   * @returns {Promise<Offices[]>}
   */
  list () {
    return this.find()
      .sort({ createdAt: 1})
      .exec()
  }
}

module.exports = mongoose.model('oficinas', OfficeSchema)