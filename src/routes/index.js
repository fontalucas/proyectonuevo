const { Router } = require('express')
const productRouter = require('./productosRouter.js')
const userRouter = require('./usersRouter')
const cookieRouter = require('./cookieRouter')
const authRouter = require('./authRouter')
const cartRouter = require('./cartRouter')
const dicRouter = require('./usuarioRouter')
const usersRouter = require('./rutes.js')
const forkRouter = require('./forkRouter.js')


const router = Router()

router.get('/',  (req, res) => {
    res.send('Ruta raiz')
})

//RUTAS PARA PRODUCTOS
router.use('/', authRouter)
router.use('/fork', forkRouter)
router.use('/cookie', cookieRouter)
router.use('/api/products', productRouter)
router.use('/api/cart', cartRouter)
router.use('/api/usuarios', userRouter)
//router.use('/dic', dicRouter)

//let usersRouter = new UserRouter()
//router.use('/user', usersRouter.getRouter())
//----------------------------------------------------------------//

module.exports = router