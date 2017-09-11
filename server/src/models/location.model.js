const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationSchema = new Schema({
  id_categoria: {
    type: String,
    required: 'ID category es requerido'
  },
  id_ubicacion: {
    type: Number,
    unique: true,
    index: true,
    required: 'ID location es requerido'
  },
  ubicacion: {
    type: String,
    required: 'Name of location es requerido'
  }
})

/**
 * Statics
 */
LocationSchema.statics = {
  /**
   * List locations in ascending order of 'id_ubicacion'.
   * @param {number} skip - Number of locations to be skipped.
   * @param {number} limit - Limit number of locations to be returned.
   * @returns {Promise<Location[]>}
   */
  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ id_ubicacion: 1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  },
  /**
   * Update a Location
   * @param {ObjectId} id - Id assign automatically when is created.
   * @param {Object} body.
   * @returns {Promise}
   */
  findByIDJoinAndUpdate (id, body) {
    body.id_categoria = body.id_categoria.join(';')
    return this.findByIdAndUpdate(id,body)
      .exec()
  },
  /**
   * Get the highest #id_ubicacion
   * @returns {Promise<Location>}
   */
  last () {
    return this.findOne()
      .select('id_ubicacion')
      .sort({ id_ubicacion: -1 })
      .exec()
  },
};

module.exports = mongoose.model('ubicaciones', LocationSchema)