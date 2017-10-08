import Atms from '../models/atms.model'

const Controller = {}

/**
 * Get ATM
 * @param req
 * @param res
 */
Controller.get = async (req, res) => {
  try {
    const atm = await Atms.findById(req.params.id)
    if (atm.length === 0) {
      res.status(404).send({errors: {message: 'El cajero no existe'}})
    }
    res.send(atm)
  }
  catch (err) {
    res.send(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Create ATM
 * @param req
 * @param res
 */
Controller.create = async (req, res) => {
  let newAtm = new Atms(req.body)
  try {
    const atm = await newAtm.save()
    res.send({
      message: 'Cajero creado exitosamente',
      atm: atm
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Update ATM
 * @param req
 * @param res
 */
Controller.update = async (req, res) => {
  try {
    const atm = await Atms.findOneAndUpdate(req.params.id, req.body)
    res.send({
      message: 'Cajero Actualizado exitosamente',
      atm: atm
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Delete ATM
 * @param req
 * @param res
 */
Controller.delete = async (req, res) => {
  try {
    const atm = await Atms.remove({_id: req.params.id})
    res.send({
      message: 'Cajero eliminado exitosamente',
      atm: atm.ok
    })
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

/**
 * Get ATMS list ordered by #createdAt
 * @param req
 * @param res
 * @param next
 */
Controller.list = async (req, res) => {
  try {
    const atms = await Atms.list()
    res.send(atms)
  }
  catch (err) {
    res.status(400).send(mongooseErrorHandler.set(err))
  }
}

export default Controller
