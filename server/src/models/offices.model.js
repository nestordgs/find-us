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
	lngLat: {
		type: Schema.Types.Mixed,
		required: [true, 'Debe seleccionar la latitud & Longitud']
  },
  telefono: {
    type: [Schema.Types.Mixed],
  },
	lun_vie: {
		type: Array,
		validate: {
			validator: arr => {
				return arr.every((v) => typeof v === 'string') && arr.length > 0
			},
			message: '{VALUE} No es un dia de la semana correcto'
		},
		required: [true, 'debe seleccionar al menos un dia de trabajo']
	},
	horario_trabajo: {
    type: Object,
    required: [true, 'Debe seleccionar el horario de trabajo']
  },
  navideno: {
    type: Schema.Types.Mixed,
    default: { desde: '', hasta:'' }
  },
  sabados: {
	  type: Schema.Types.Mixed,
	  default: { desde: '', hasta:'' }
  },
  feriados: {
	  type: Schema.Types.Mixed,
	  default: { desde: '', hasta:'' }
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