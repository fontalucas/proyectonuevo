const passport = require('passport');
const UserModel = require('../models/userModel');
const GithubStrategy = require('passport-github2');


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
                    
                }
            }

        }catch (e) {}
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