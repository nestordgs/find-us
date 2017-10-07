import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  id_categoria: {
    type: Number,
    unique: true,
    index: true,
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
}, {timestamps: true})

/**
 * Statics
 */
CategorySchema.statics = {
  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of categorys to be skipped.
   * @param {number} limit - Limit number of categorys to be returned.
   * @returns {Promise<Category[]>}
   */
  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ id_categoria: 1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  },
  /**
   * Get the highest #id_categoria
   * @returns {Promise<Category>}
   */
  last () {
    return this.findOne()
      .select('id_categoria')
      .sort({ id_categoria: -1 })
      .exec()
  },
  /**
   * Get categorys in the array in ascending order of id_categoria
   * @param {array} opt - Array with options ["x", "x"]
   * @returns {Promise<Category[]>}
   */
  getByArray (opt) {
    return this.find()
      .where('id_categoria')
      .in(opt)
      .sort({ id_categoria: 1 })
      .exec()
  }
}

let CategoryModel = mongoose.model('categoria', CategorySchema)
export default CategoryModel
