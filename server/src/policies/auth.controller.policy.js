import Joi from 'joi'

const Controller = {
  register (req, res, next) {
    const schema = Joi.object().keys({
      nombre: Joi.string().min(3).max(30).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,32}$/),
      email: Joi.string().email({minDomainAtoms: 2})
    })
    Joi.validate(req.body, schema, (err, value) => {
      if (err) {
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
                message: 'La Contraseña no cumple con los parametros permitidos',
                opt0: 'Solo puede contener los siguientes caracteres: Minusculas, Mayusculas.',
                opt1: 'No puede ser menor de 8 caracteres ni mayor de 32 caracteres.'
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

export default Controller
