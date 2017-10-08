import Location from '../models/location.model'

const Controller = {}

function isNumeric (value) {
  let type = typeof value

  return (type === 'number' || type === 'string') && !Number.isNaN(value - Number.parseFloat(value))
}

/**
 * Get Location.
 * @param req
 * @param res
 */
Controller.get = async (req, res) => {
  try {
    const location = await Location.find({id_ubicacion: req.params.id})
    if (location.length === 0) {
      return res.status(404)
        .send({errors: {message: 'La ubicacion no existe'}})
    }
    res.send(location)
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Create Location.
 * @param req
 * @param res
 */
Controller.create = async (req, res) => {
  let newLocation = new Location({
    id_categoria: req.body.id_categoria.join(';'),
    id_ubicacion: req.body.id_ubicacion,
    ubicacion: req.body.ubicacion
  })
  try {
    const location = await newLocation.save()
    res.send({
      message: 'Ubicacion creada Exitosamente',
      location: location
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Update Location.
 * @param req
 * @param res"
 */
Controller.update = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      message: 'Ubicacion actualizada Exitosamente',
      location: location
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Delete Location.
 * @param req
 * @param res
 */
Controller.delete = async (req, res) => {
  try {
    const location = await Location.remove({_id: req.params.id})
    res.send({
      message: 'Ubicacion eliminada Exitosamente',
      location: location.ok
    })
  }
  catch (err) {
    res.status(40).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Get Location list.
 * @param req
 * @param res
 */
Controller.list = async (req, res) => {
  try {
    const {limit = 50, skip = 0} = req.body
    const location = await Location.list({limit, skip})
    res.send(location)
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Get last #ID Location.
 * @param req
 * @param res
 */
Controller.last = async (req, res) => {
  try {
    const location = await Location.last()
    let newId
    (location) ? newId = parseFloat(location.id_ubicacion) + 1 : 1
    res.send({id: newId})
  }
  catch (err) {
    res.send(mongooseErrorHandler.set(err))
  }
}

/**
 * Get Locations where id_categoria in param.id
 * @param req
 * @param res
 */
Controller.byCat = async (req, res) => {
  const locationsByCat = []
  try {
    const locations = await Location.find().sort({ubicacion: 1}).exec()
    if (!isNumeric(req.params.id)) {
      return res.status(400).send({errors: {nessage: 'El parametro debe ser numero'}})
    }
    locations.forEach(function (location) {
      let looper = location.id_categoria.split(';')
      looper.forEach(function (loop) {
        if (loop === req.params.id) {
          locationsByCat.push(location)
        }
      })
    })
    res.send(locationsByCat)
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

export default Controller
