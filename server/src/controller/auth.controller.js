const express = require('express')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}


module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
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