const passport = require('passport');
const local = require('passport-local');
const GithubStrategy = require('passport-github2');
const UserModel = require('../models/userModel')
const { createHash, isValidPassword } = require('../utils/bcryptPass.js');
const  {UserDao}  = require('../daos/factory');

const userDao = UserDao
const LocalStrategy = local.Strategy

function initializePassport() {
    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.50f113b2ef06dc3f',
        clientSecret: '7045aaaeb8aef20dc367efa2ee16dfb528338270',
        callbackURL: 'http://localhost:8080/api/auth/githubcallback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken, profile);
        try {
            let user = await UserModel.findOne({email: profile._json.email});
            
            if (!user) {
                let newUser = {
                    first_name: profile.username,
                    last_name: profile.username,
                    email: profile._json.email,
                    role: 'user',
                    password: createHash('1234')
                }
                let result = await UserModel.create(newUser)
                return done(null, result)
            }
            return done(null, user)
        }catch (error) {
            return done (error)
        }
    }
    ))

    passport.use('login', new LocalStrategy({
            usernameField: 'username'
        },
        async (username, password, done) => {
            try {
                let user = await userDao.createUser(username)
                console.log(user)
                if (!user) {
                    console.log('usuario no existe')
                    return done(null, false)
                }

                if(!isValidPassword(user, password)){
                    console.log('datos invalidos')
                    return done(null, false)
                }
                return done(null, user)
            } catch (error) {
                console.log(error)
                return done(error)
            }
        }
    ))

    passport.use('register', new LocalStrategy({
            usernameField: 'email',
        },
        async (req, username, password, done)=>{
            const { first_name, last_name, role = 'user', email } = req.body
            let user = { first_name, last_name, role, email, password: createHash(password) }
            //console.log('username: ',username);
            //console.log('password: ',password);
            try {
                let exist = await userDao.getUser(username)
                
                if(exist) {
                    console.log('Usuario existente')
                    return done(null, false)
                }else{
                    console.log('Usuario creado')
                    let result = await userDao.createUser(user)
                    return done(null, result)
                }
            } catch (error) {
                console.log(error)
                return done('Error al obrener el usuario')
            }
        }
    ))
    passport.serializeUser((user, done) =>{
        done(null, user.id)
    }) // guarda el id
    passport.deserializeUser(async (id, done)=>{
        let user = await UserModel.findById(id)
        done(null, user)
    }) // deserializa y  busca el id

}

module.exports = {initializePassport}