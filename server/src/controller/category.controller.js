const mongoose = require('mongoose')
const Category = mongoose.model('categoria')

/**
 * Get Category.
 * @param req
 * @param res
 */
exports.get = (req, res) => {
  Category.find({id_categoria: req.params.id}, (err, category) => {
    if (err) return res.status(400).send(err)
    if (category.length === 0) return res.status(404).send({ message: 'La Categoria no existe' })
    res.send(category)
  })
}

/**
 * Create Category.
 * @param req
 * @param res
 */
exports.create = (req, res) => {
  let newCategory = new Category({
    id_categoria: req.body.id_categoria,
    categoria: req.body.categoria,
    descripcion: req.body.descripcion
  })

  newCategory.save((err, category) => {
    if (err) return res.status(400).send(err.errors)
    res.send({message: 'Categoria Creada Exitosamente'})
  })
}

/**
 * Update Category.
 * @param req
 * @param res"
 */
exports.update = (req, res) => {
  Category.findByIdAndUpdate(req.params.id, req.body, (err, category) => {
    if (err) return res.status(400).send(err)
    res.send({message: 'Categoria Actualizada Exitosamente'})
  })
}

/**
 * Delete Category.
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.id, (err, category) => {
    if (err) return res.status(400).send(err)
    res.send({message: 'Categoria Eliminada Exitosamente'})
  })
}

/**
 * Get Category list.
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query
  Category.list({limit, skip})
    .then(categorys => res.send(categorys))
    .catch(e => next(e))
}

/**
 * Get last #ID Category.
 * @param req
 * @param res
 * @param next
 */
exports.last = (req, res, next) => {
  Category.last().then(category => {
    console.log(category)
    let newId
    (category) ? newId = parseFloat(category.id_categoria) + 1 : newId = 1
    res.send({id: newId})
  }).catch(e => next(e))
}

/**
 * Get Categorys in Array.
 * @param req
 * @param res
 * @param next
 */
exports.getIn = (req, res, next) => {
  Category.getByArray(req.body.opt)
    .then(categorys => {
      res.send(categorys)
    })
    .catch(e => next(e))
}
