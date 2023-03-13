const { Router } = require('express')
const UserModel = require('../models/userModel')

const router = Router()


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


router.post('/login', async (req, res)=>{
    const {email, password} = req.body
    const user = await UserModel.findOne({email, password})

    if (!user) return res.status(404).send({status: 'error', message: 'Usuario incorrecto'})
    
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`
    }
    
    res.status(200).send({
        status: 'success',
        payload: req.session.user,
        message: 'Login correcto'
    })
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
    const {first_name, last_name, email} = req.body
    const exist = await UserModel.findOne({email})
    try {
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
            result
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


router.get('/logout', (req, res)=>{
    req.session.destroy(err => {
        if(!err) res.send('logout ok')
        else res.send({status:'Logout error', message: err})
    })
    
})

module.exports = router
