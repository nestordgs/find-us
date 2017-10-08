import City from '../models/cities.model'

const Controller = {}

/**
 * Get City
 * @param req
 * @param res
 */
Controller.get = async (req, res) => {
  try {
    const city = await City.find({id_ciudad: req.params.id}).exec()
    if (city.length === 0) {
      return res.status(404)
        .send({errors: {message: 'La ciudad no existe'}})
    }
    res.send(city)
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Create City
 * @param req
 * @param res
 */
Controller.create = async (req, res) => {
  let newCity = new City({
    id_ciudad: req.body.id_ciudad,
    ciudad: req.body.ciudad,
    id_ubicacion: req.body.id_ubicacion,
    id_categoria: req.body.id_categoria.join(';')
  })
  try {
    const city = await newCity.save()
    res.send({
      message: 'Ciudad creada exitosamente',
      city: city
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Update City
 * @param req
 * @param res
 */
Controller.update = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      message: 'Ciudad modificada exitosamente',
      city: city
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Delete City
 * @param req
 * @param res
 */
Controller.delete = async (req, res) => {
  try {
    const city = await City.remove({_id: req.params.id})
    res.send({
      mesage: 'Ciudad elminada exitosamente',
      city: city.ok
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Get Cities List ordered by #id_ciudad
 * @param req
 * @param res
 */
Controller.list = async (req, res) => {
  try {
    const cities = await City.list()
      res.send(cities)
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Get last #ID City
 * @param req
 * @param res
 */
Controller.last = async (req, res) => {
  try {
    const city = await City.last()
    let newId
    (city) ? newId = parseFloat(city.id_ciudad) +1 : 1
    res.send({id: newId})
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

export default Controller
