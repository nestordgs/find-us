const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    id_categoria: {
        type: Number,
        required: 'ID Categoria es Requerido'
    },
    categoria: {
        type: String,
        required: 'Nombre es Requerido'
    },
    descripcion: String
});

module.exports = mongoose.model('Category', CategorySchema);