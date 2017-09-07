const mongoose = require('mongoose');
const Category = mongoose.model('categoria');

/**
 * Get user.
 * @param req
 * @param res
 */
exports.get = (req, res) => {
    Category.find({id_categoria: req.params.id}, (err, category) => {
        if (err) return res.send(err);
        if (category.length === 0) return res.status(404).send({ message: 'La Categoria no existe' });
        res.send(category);
    });
};

/**
 * Create user.
 * @param req
 * @param res
 */
exports.create = (req, res) => {
    let new_category = new Category({
        id_categoria: req.body.id,
        categoria: req.body.name,
        descripcion: req.body.descripcion
    });
    
    new_category.save((err, category) => {
        if (err) return res.send(err);
        res.send(category);
    });
};

/**
 * Update user.
 * @param req
 * @param res"
 */
exports.update = (req, res) => {
    Category.findOneAndUpdate({id_categoria: req.params.id}, {
        id_categoria: req.body.id,
        categoria: req.body.name,
        descripcion: req.body.descripcion
    }, {new: true}, (err, category) => {
        if (err) return res.send(err);
        res.send(category);
    });
};

/**
 * Delete user.
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
    Category.remove({id_categoria: req.params.id}, (err, category) => {
        if (err) return res.status(404).send(err);
        res.send({message: 'Category successfully deleted'});
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
    Category.list({limit, skip})
        .then(categorys => res.send(categorys))
        .catch(e => next(e));
};