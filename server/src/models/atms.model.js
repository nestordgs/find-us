const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AtmsSchema = new Schema({
	id_ubicacion: {
		type: Number,
		required: 'ID Ubicacion is required'
	},
	id_ciudad: {
		type: Number,
		required : 'ID Ciudad is required'
	},
	nombre: {
		type: String,
		required: 'Nombre Atm is required'
	},
	direccion: {
		type: String,
		required: 'Direccion Atm is required'
	},
	longitud: {
		type: Number,
		required: 'Longitud Atm is required'
	},
	latitud: {
		type: Number,
		required: 'LatitudAtm is required'
	}
}, {timestamps: true})

AtmsSchema.statics = {
	/**
	 * List atms in ascending order of createdAt
	 */
	list () {
		return this.find()
			.sort({ createdAt: 1 })
			.exec()
	}
}

module.exports = mongoose.model('cajeros', AtmsSchema)