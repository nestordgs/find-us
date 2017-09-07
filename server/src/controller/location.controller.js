const mongoose = require('mongoose');
const Location = mongoose.model('ubicaciones');

/**
 * Get user.
 * @param req
 * @param res
 */
exports.get = (req, res) => {
    Location.find({id_categoria: req.params.id}, (err, location) => {
        if (err) return res.send(err);
        if (location.length === 0) return res.status(404).send({ message: 'La Ubicación no existe' });
        res.send(location);
    });
};

/**
 * Create user.
 * @param req
 * @param res
 */
exports.create = (req, res) => {
    let new_location = new Location({
        id_categoria: req.body.id,
        categoria: req.body.name,
        descripcion: req.body.descripcion
    });

    new_location.save((err, location) => {
        if (err) return res.send(err);
        res.send(location);
    });
};

/**
 * Update user.
 * @param req
 * @param res"
 */
exports.update = (req, res) => {
    Location.findOneAndUpdate({id_categoria: req.params.id}, {
        id_categoria: req.body.id,
        categoria: req.body.name,
        descripcion: req.body.descripcion
    }, {new: true}, (err, location) => {
        if (err) return res.send(err);
        res.send(location);
    });
};

/**
 * Delete user.
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
    Location.remove({id_categoria: req.params.id}, (err, location) => {
        if (err) return res.status(404).send(err);
        res.send({message: 'Location successfully deleted'});
    });
};

/**
 * Get user list.
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
    const { limit = 50, skip = 0 } = req.query;
    Location.list({limit, skip})
        .then(locations => res.send(locations))
        .catch(e => next(e));
};