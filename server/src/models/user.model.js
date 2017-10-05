const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

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
}, {timestamps: true})

UserSchema.pre('save', function (next) {
  const user = this
  const SALT_FACTOR = 8

  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.password = hash
      next()
    })
})

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareAsync(password, this.password)
}

module.exports = mongoose.model('user', UserSchema)