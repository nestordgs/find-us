import Office from '../models/offices.model'

const Controller = {}

/**
 * Get Office
 * @param req
 * @param res
 */
Controller.get = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id)
    if (office.length === 0) {
      return res.status(404).send({errors: {message: 'La oficina no existe'}})
    }
    res.send(office)
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Create Office
 * @param req
 * @param res
 */
Controller.create = async (req, res) => {
  let newOffice = new Office(req.body)
  try {
    const office = await newOffice.save()
    res.send({
      message: 'Oficina creada exitosamente',
      office: office
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Update Office
 * @param req
 * @param res
 */
Controller.update =async (req, res) => {
  try {
    const office = await Office.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      message: 'Oficina actualizada exitosamente',
      office: office
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Delete Office
 * @param req
 * @param res
 */
Controller.delete = async (req, res) => {
  try {
    const office = await Office.remove({_id: req.params.id})
    res.send({
      message: 'Oficina eliminada exitosamente',
      office: office.ok
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Get Offices list ordered by #createdAt
 * @param req
 * @param res
 * @param next
 */
Controller.list = async (req, res) => {
  try {
    const offices = await Office.list()
    res.send(offices)
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

export default Controller
