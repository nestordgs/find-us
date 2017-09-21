const mongoose = require('mongoose')
const Atms = mongoose.model('cajeros')

/**
 * Get ATM
 * @param req
 * @param res
 */
exports.get = (req, res) => {
	Atms.findById(req.params.id, (err, atm) => {
		if (err) return res.status(400).send(mongooseErrorHandler.set(err))
		if (atm.length === 0) return res.status(404).send({ message: 'El Cajero no existe' })
		res.send(atm)
	})
}

/**
 * Create ATM
 * @param req
 * @param res
 */
exports.create= (req, res) => {
	let newAtm = new Atms(req.body)

	newAtm.save((err, atm) => {
		if (err) return res.status(400).json(mongooseErrorHandler.set(err))
		res.send({ message: 'Cajero creado Exitosamente' })
	})
}

/**
 * Update ATM
 * @param req
 * @param res
 */
exports.update = (req, res) => {
	Atms.findByIdAndUpdate(req.params.id, req.body, (err, atm) => {
		if (err) return res.status(400).send(mongooseErrorHandler.set(err))
		res.send({ message: 'Cajero actualizado exitosamente' })
	})
}

/**
 * Delete ATM
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
	Atms.findByIdAndRemove(req.params.id, (err, atm) => {
		if (err) return res.status(400).send(mongooseErrorHandler.set(err))
		res.send({ message: 'Cajero eliminado exitosamente' })
	})
}

/**
 * Get ATMS list ordered by #createdAt
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
	Atms.list()
		.then(atm => res.send(atm))
		.catch(e => next(e))
}