const mongoose = require('mongoose')
const Office = mongoose.model('oficinas')

/**
 * Get Office
 * @param req
 * @param res
 */
exports.get = (req, res) => {
  Office.findById(req.params.id, (err, office) => {
    if (err) return res.status(400).send(err)
    if (office.length === 0) return res.status(400).send({ message: 'La oficina no existe' })
    res.send(office)
  })
}

/**
 * Create Office
 * @param req
 * @param res
 */
exports.create = (req, res) => {
  let newOffice = new Office(req.body)

  newOffice.save((err, office) => {
    if (err) return res.status(400).send(err)
    res.send({ message: 'Oficina creada exitosamente' })
  })
}

/**
 * Update Office
 * @param req
 * @param res
 */
exports.update = (req, res) => {
  Office.findByIdAndUpdate(req.params.id, req.body, (err, office) => {
    if (err) return res.status(400).send(err)
    res.send({ message: 'Oficina actualizada exitosamente' })
  })
}

/**
 * Delete Office
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
  Office.findByIdAndRemove(req.params.id, (err, office) => {
    if (err) return res.status(400).send(err)
    res.send({ message: 'Oficina eliminada exitosamente' })
  })
}

/**
 * Get Offices list ordered by #createdAt
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
  Office.list()
    .then(offices => res.send(offices))
    .catch(e => next(e))
}