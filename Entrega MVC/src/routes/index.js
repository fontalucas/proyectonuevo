const { Router } = require('express')
const productRouter = require('./productosRouter.js')
const userRouter = require('./usersRouter.js')
//const cookieRouter = require('./cookieRouter')
const authRouter = require('./authRouter.js')
const cartRouter = require('./cartRouter.js')
const ordersRouter = require('./ordersRouter.js')
const fakerRouter = require('./fakerRouter.js')



const router = Router()

router.get('/', (req, res) => {
    res.send('Ruta raiz')
})

//RUTAS PARA PRODUCTOS
router.use('/', authRouter)
router.use('/api/products', productRouter)
router.use('/api/cart', cartRouter)
router.use('/api/usuarios', userRouter)
router.use('/api/orders', ordersRouter)
router.use('/mocking', fakerRouter)

//let usersRouter = new UserRouter()
//router.use('/user', usersRouter.getRouter())
//----------------------------------------------------------------//

module.exports = router