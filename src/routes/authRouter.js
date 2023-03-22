const { Router } = require('express')
const passport = require('passport')
const UserModel = require('../models/userModel')

const router = Router()

//let users = [{first_name: 'John', last_name: 'aasd', email: 'a@gmail.com', password: '1234', role: 'user'}]

router.get('/', async (req, res)=>{    
    let testUser = {
        name: 'Lucas',
        last_name: 'Fontanellaz',
        role: 'admin',
    }
    
    // req.session.user = testUser.name
    // req.session.admin = true

    res.status(200).render('index', {
        user: testUser,
        isAdmin: testUser.role==='admin',
        products,
        style: 'index.css'
    })
})


router.get('/login', async (req, res)=>{
    res.status(200).render('login')})

/* LOGIN CON GITHUB */
router.get('/github', passport.authenticate('github', {scope: ['user:email']}))
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/api/auth/login'}))
//----------------------------------------------------------------//


router.post('/login', async (req, res)=>{
    const {email, password} = req.body

    const user = await UserModel.findOne({email})

    if (!user) return res.status(404).send({status: 'error', message: 'Usuario incorrecto'})

    if (email !== 'lucasadmin@gmail.com' || password !== 'Admin') {
        req.session.user = {name: `${user.first_name} ${user.last_name}`, email: user.email}
        res.status(200).send({
            status: 'success',
            payload: req.session.user,
            message: 'Login correcto'
        })
        
        /* const access_token = generateToken(user)
        
        res.cookie('CoderKeyQueFuncionaCOmoUnSecret', token, {
            maxAge:60 * 60 * 24 ,
            httpOnly: true}).send({message: 'logged in'}) */
}

})
// ruta cookie
// router.post('/login', (req, res)=>{
//     const data = req.body
//     console.log(data)
//     res.cookie('CoderCookie', data, {maxAge:1000000}).send({
//         status: "success",
//         message: "Cookie creada"
//     })
// })

router.get('/register', async (req, res) => {
    res.status(200).render('register')
})


router.post('/register', async (req, res)=>{
    const {first_name, last_name, email, password} = req.body
    const exist = await UserModel.findOne({email})
    try {
        if(!first_name || !last_name || !email || !password) {return res.status(401).send({status: 'error', message: 'Llenar bien los campos'})}

        if(exist) return res.status(401).send({status: 'error', message: 'usuario existente'})
        
        const user = {
            first_name,
            last_name,
            email,
            password
        }
        let result = await UserModel.create(user)
        res.status(200).json({
            status: 'success',
            message: 'usuario creado con exito',
            payload: result
        })
    }catch(err) {console.log(err)}
})



//-------------------------------------------------
/* router.get('/login', (req, res)=>{
    const {username, password} = req.query
    // console.log(data)
    if (username !== 'fede' || password !== 'admin') {
        return res.send('login falló')
    } else {

        req.session.user = username
        // req.session.counter = 1
        // req.session.password = password
        req.session.admin = true
        res.send({mensaje: 'login ok', username})
    }
}) */

/// ______________________________________________

/* router.get('/session', (req, res)=>{
    if (req.session.counter) {
        req.session.counter++
        res.send(`Bienvenido a tu visita número ${req.session.counter}`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido a tu primera visita')
    }
}) */
router.post('/restaurarpass', async (req, res) => {
    const { email, password } = req.body

    // Encontrar el usuario por correo electrónico
    const user = await UserModel.findOne({ email });

    if (!user) {
      // Si el usuario no existe, redireccionar a una página de error
    return res.status(401).send({status: 'error', message: 'El usuario no existe'})
    }    

    //Hasear Actualizar la contraseña del usuario
    user.password = createHash(password)
    await user.save()

    // Redireccionar al usuario a la página de login
    res.status(200).json({status: 'success', message:'Contraseña actualizada correctamente'});
})


router.get('/logout', async (req, res)=>{
    try {
        req.session.destroy(err => {
            if(!err) res.send('logout ok')
            else res.send({status:'Logout error', message: err})
        })
    } catch (error) {
        console.log(error);
    }
    
})

module.exports = router
