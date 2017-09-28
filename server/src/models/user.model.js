const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'Debe Ingresar Su nombre']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Debe Ingresar Su Correo Electronico']
  },
  password: {
    type: String,
    required: [true, 'Debe ingresar Su contraseña']
  },
  active: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('user', UserSchema)