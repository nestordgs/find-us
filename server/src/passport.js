import passport from 'passport'
import User from './models/user.model'
import PassportJWT from 'passport-jwt'

const JwtStrategy = PassportJWT.Strategy
const ExtractJwt = PassportJWT.ExtractJwt

import config from './config/config'

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({id: jwtPayload.id})
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

export default null
