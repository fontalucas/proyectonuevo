const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')


const JWTStrategy = Strategy
const ExtractJWT = ExtractJwt
const cookieExtracotr = req => {
    let token = null
    if(req && req.cookies)
    token = req.cookies['coderCoookieToken']
}

const objectConfig = {
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    sectretOrKey: 'coderSecret'
}

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy(objectConfig, async (jwt_payload, done) => { 
        try {
            //if(!user) return done(null, false, {messages: 'Not User'})
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }
    ))
}

module.exports = {
    initializePassport
}