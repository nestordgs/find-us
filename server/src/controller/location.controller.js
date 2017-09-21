const mongoose = require('mongoose')
const Location = mongoose.model('ubicaciones')

/**
 * Get Location.
 * @param req
 * @param res
 */
exports.get = (req, res) => {
  Location.find({id_ubicacion: req.params.id}, (err, location) => {
    if (err) return res.status(400).send(mongooseErrorHandler.set(err))
    if (location.length === 0) return res.status(404).send({ message: 'La Ubicación no existe' })
    res.send(location)
  })
}

/**
 * Create Location.
 * @param req
 * @param res
 */
exports.create = (req, res) => {
  let newLocation = new Location({
    id_categoria: req.body.id_categoria.join(';'),
    id_ubicacion: req.body.id_ubicacion,
    ubicacion: req.body.ubicacion
  })

  newLocation.save((err, location) => {
    if (err) return res.status(400).send(mongooseErrorHandler.set(err))
    res.send({message: 'Nueva Ubicacion creada Exitosamente'})
  })
}

/**
 * Update Location.
 * @param req
 * @param res"
 */
exports.update = (req, res) => {
  Location.findByIDJoinAndUpdate(req.params.id, req.body)
    .then(location => {
      res.send({message: 'Ubicacion Actualizada Exitosamente'})
    })
    .catch(e => res.status(400).send(e))
}

/**
 * Delete Location.
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
  Location.findByIdAndRemove(req.params.id, (err, location) => {
    if (err) return res.status(400).send(mongooseErrorHandler.set(err))
    res.send({message: 'Ubicacion Eliminada Exitosamente'})
  })
}

/**
 * Get Location list.
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query
  Location.list({limit, skip})
    .then(locations => res.send(locations))
    .catch(e => next(e))
}

/**
 * Get last #ID Location.
 * @param req
 * @param res
 * @param next
 */
exports.last = (req, res, next) => {
  Location.last().then(locations => {
    let newId = (locations) ? parseFloat(locations.id_ubicacion) + 1 : 1
    res.send({id: newId})
  }).catch(e => next(e))
}
