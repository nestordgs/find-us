const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      res.status(403).send({
        errors: {
          message: 'Usted No tiene acceso para consultar esta ruta'
        }
      })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}
