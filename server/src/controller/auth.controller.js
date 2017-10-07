import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import config from '../config/config'

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}


const AuthController = {
  async register (req, res) {
    let newUser = new User({
      nombre: req.body.nombre,
      email: req.body.email,
      password: req.body.password
    })
    try {
      const user = await newUser.save()
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        errors: {
          message: 'Correo Electronico ya esta siendo utilizado.'
        }
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        email: email,
      })
      if (!user) {
        res.status(403).send({
          errors: {
            message: 'Correo Electronico Invalido.'
          }
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        res.status(403).send({
          errors: {
            message: 'Contraseña no coincide.'
          }
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(403).send({
        errors: {
          message: 'Ha ocurrido un error al realizar el inicio de sesion.'
        }
      })
    }
  }
}

export default AuthController
