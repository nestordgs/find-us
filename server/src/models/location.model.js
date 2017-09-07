const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    id_categoria: {
        type: String,
        required: 'ID category es requerido'
    },
    id_ubicacion: {
        type: Number,
        unique: true,
        index: true,
        required: 'ID location es requerido'
    },
    ubicacion: {
        type: String,
        required: 'Name of location es requerido'
    }
});

/**
 * Statics
 */
LocationSchema.statics = {
    /**
     * List users in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

module.exports = mongoose.model('ubicaciones', LocationSchema);