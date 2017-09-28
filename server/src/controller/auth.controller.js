const express = require('express')
const User = require('../models/user.model')

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
  }
}