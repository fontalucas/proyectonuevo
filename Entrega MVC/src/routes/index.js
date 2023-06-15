const { Router } = require('express')
const productRouter = require('./productosRouter.js')
const userRouter = require('./usersRouter.js')
const authRouter = require('./authRouter.js')
const cartRouter = require('./cartRouter.js')
const ordersRouter = require('./ordersRouter.js')
const fakerRouter = require('./fakerRouter.js')
const loggerRouter = require('./loggerRouter.js')
const apidocRouter = require('./apidocRouter.js')
const swaggerUiExpress = require('swagger-ui-express')
const specs = require('./apidocRouter.js')



const router = Router()

router.get('/', (req, res) => {
    res.send('Ruta raiz')
})

//RUTAS PARA PRODUCTOS
router.use('/api/auth', authRouter)
router.use('/api/products', productRouter)
router.use('/api/cart', cartRouter)
router.use('/api/usuarios', userRouter)
router.use('/api/orders', ordersRouter)
router.use('/mocking', fakerRouter)
router.use('/loggertest', loggerRouter)
//router.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs), apidocRouter)

//let usersRouter = new UserRouter()
//router.use('/user', usersRouter.getRouter())
//----------------------------------------------------------------//

module.exports = router