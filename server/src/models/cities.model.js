import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CitySchema = new Schema({
  id_ciudad: {
    type: Number,
    unique: true,
    index: true,
    required: 'ID city is required'
  },
  ciudad: {
    type: String,
    required: 'Name of city is required'
  },
  id_ubicacion: {
    type: Number,
    required: 'ID location is required'
  },
  id_categoria: {
    type: String,
    required: 'ID category is required'
  }
}, {timestamps: true})

CitySchema.statics = {
  /**
   * List cities in ascending order of 'id_ciudad'.
   * @returns {Promise<City[]>}
   */
  list () {
    return this.find()
      .sort({id_ciudad: 1})
      .exec()
  },
  /**
   * Get the highest #id_ciudad
   * @returns {Promise}
   */
  last () {
    return this.findOne()
      .select('id_ciudad')
      .sort({id_ciudad: -1})
      .exec()
  }
}

let CityModel = mongoose.model('ciudades', CitySchema)

export default CityModel
