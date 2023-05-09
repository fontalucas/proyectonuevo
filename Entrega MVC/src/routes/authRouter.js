const { Router } = require('express')
const passport = require('passport')
const LoginController = require('../controller/loginController')

const router = Router()
const loginController = new LoginController

/* LOGIN CON GITHUB */
router.get('/github', passport.authenticate('github', {scope: ['user:email']}))
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}))
//----------------------------------------------------------------//
router.get('/login', loginController.loginRender)
router.post('/login', loginController.loginUser)
router.get('/register', loginController.registerRender)
router.post('/register', loginController.registerUser)
router.post('/restaurarpass', loginController.restarPass)
router.get('/logout', loginController.logout)

module.exports = router
