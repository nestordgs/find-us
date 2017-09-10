const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  id_categoria: {
    type: Number,
    required: 'ID Categoria es Requerido'
  },
  categoria: {
    type: String,
    required: 'Nombre es Requerido'
  },
  descripcion: {
    type: String,
    default: ''
  }
})

/**
 * Statics
 */
CategorySchema.statics = {
  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  },
  last () {
    return this.findOne()
      .sort({ id_categoria: -1 })
      .exec()
  },
  getByArray (opt) {
    return this.find()
      .where("id_categoria")
      .in(opt)
      .sort({ id_categoria: 1 })
      .exec()
  }
};

module.exports = mongoose.model('categoria', CategorySchema);