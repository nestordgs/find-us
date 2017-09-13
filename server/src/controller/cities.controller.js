const mongoose = require('mongoose')
const City = mongoose.model('ciudades')

/**
 * Get City
 * @param req
 * @param res
 */
exports.get = (req, res) => {
  City.find({id_ciudad: req.params.id}, (err, city) => {
    if (err) return res.status(400).send(err)
    if (city.length === 0) return res.status(404).send({ message: 'La ciudad no existe' })
    res.send(city)
  })
}

/**
 * Create City
 * @param req
 * @param res
 */
exports.create = (req, res) => {
  let newCity = new City(req.body)

  newCity.save((err, city) => {
    if (err) return res.status(400).send(err)
    res.send({ message: 'Ciudad creada exitosamente' })
  })
}

/**
 * Update City
 * @param req
 * @param res
 */
exports.update = (req, res) => {
  City.findByIdAndUpdate(req.params.id, req.body, (err, city) => {
    if (err) return res.status(400).send(err)
    res.send({ message: 'Ciudad actualizada exitosamente' })
  })
}

/**
 * Delete City
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
  City.findByIdAndRemove(req.params.id, (err, city) => {
    if (err) return res.status(400).send(err)
    res.send({ message: 'Ciudad eliminada exitosamente' })
  })
}

/**
 * Get Cities List ordered by #id_ciudad
 * @param req
 * @param res
 */
exports.list = (req, res, next) => {
  City.list()
    .then(cities => res.send(cities))
    .catch(e => next(e))
}

/**
 * Get last #ID City
 * @param req
 * @param res
 * @param next
 */
exports.last = (req, res, next) => {
  City.last()
    .then(city => {
      let newID = (city) ? parseFloat(city.id_ciudad) + 1 : 1
      res.send({ id: newID })
    })
    .catch(e => next(e))
}