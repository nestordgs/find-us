const mongoose = require('mongoose');
const Category = mongoose.model('Category');

/**
 * Get user.
 * @param req
 * @param res
 */
exports.get = (req, res) => {
    Category.find({id_category: req.params.id}, (err, category) => {
        if (err) return res.send(err);
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
        id_category: req.body.id,
        category: req.body.name,
        description: req.body.description
    });

    new_category.save((err, category) => {
        if (err) return res.send(err);
        res.send(category);
    });
};

/**
 * Update user.
 * @param req
 * @param res
 */
exports.update = (req, res) => {
    Category.findOneAndUpdate({id_category: req.params.id}, {
        id_category: req.body.id,
        category: req.body.name,
        description: req.body.description
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
    Category.remove({id_category: req.params.categoryId}, (err, category) => {
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
    /*const { limit = 50, skip = 0 } = req.query;
    Category.list({limit, skip})
        .then(categorys => res.send(categorys))
        .catch(e => next(e));*/
    Category.find({}, (err, category) => {
        if (err) return res.send(err);
        res.send(category);
    });
};