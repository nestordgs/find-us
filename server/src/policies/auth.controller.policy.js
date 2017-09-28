const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object().keys({
      nombre: Joi.string().min(3).max(30).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,32}$/),
      email: Joi.string().email({minDomainAtoms: 2})
    })

    Joi.validate(req.body, schema, (err, value) => {

      if (err) {
        console.log(err.details[0])
        switch (err.details[0].context.key) {
          case 'nombre':
            res.status(400).send({
              errors: {
                message: 'Debe Ingresar un Nombre Correcto'
              }
            })
            break
          case 'email':
            res.status(400).send({
              errors: {
                message: 'La direccion de Correo Electronico es invalida'
              }
            })
            break
          case 'password':
            res.status(400).send({
              errors: {
                message: `La Contraseña debe cumplir los siguientes parametros:
              <br>
              1. Solo puede contener los siguientes caracteres: Minusculas, Mayusculas.
              <br>
              2. No puede ser menor de 8 caracteres ni mayor de 32 caracteres.`
              }
            })
            break
          default:
            break
        }
      } else {
        next()
      }
    })
  }
}