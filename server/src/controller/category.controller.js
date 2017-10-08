import Category from '../models/category.model'

const Controller = {}

/**
 * Get Category.
 * @param req
 * @param res
 */
Controller.get = async (req, res) => {
  try {
    const category = await Category.find({id_categoria: req.params.id}).exec()
    if (category.length === 0) {
      return res.status(404)
        .send({errors: {message: 'La Categoria no existe'}})
    }
    res.send(category)
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Create Category.
 * @param req
 * @param res
 */
Controller.create = async (req, res) => {
  let newCategory = new Category({
    id_categoria: req.body.id_categoria,
    categoria: req.body.categoria,
    descripcion: req.body.descripcion
  })
  try {
    const category = await newCategory.save()
    res.send({
      message: 'Categoria creada Exitosamente',
      category: category
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Update Category.
 * @param req
 * @param res"
 */
Controller.update = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      message: 'Categoria Actualizada Exitosamente',
      category: category
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Delete Category.
 * @param req
 * @param res
 */
Controller.delete = async (req, res) => {
  try {
    const category = await Category.remove({_id: req.params.id})
    res.send({
      message: 'Categoria Eliminada Exitosamente',
      category: category.ok
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Get Category list.
 * @param req
 * @param res
 */
Controller.list = async (req, res) => {
  try {
    const {limit = 50, skip = 0} = req.query
    const categorys = await Category.list({limit, skip})
    res.send(categorys)
  }
  catch (err) {
    res.send(mongooseErrorHandler.set(err))
  }
}

/**
 * Get last #ID Category.
 * @param req
 * @param res
 */
Controller.last = async (req, res) => {
  try {
    const category = await Category.last()
    let newId
    (category) ? newId = parseFloat(category.id_categoria) + 1 : newId = 1
    res.send({id: newId})
  }
  catch (err) {
    res.send(mongooseErrorHandler.set(err))
  }
}

/**
 * Get Categorys in Array.
 * @param req
 * @param res
 */
Controller.getIn = async (req, res) => {
  try {
    const categorys = await Category.getByArray(req.body.opt)
    res.send(categorys)
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

export default Controller
