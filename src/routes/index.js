const { Router } = require('express')
const productRouter = require('./productosRouter.js')
//const userRouter = require('./usersRouter')
const cookieRouter = require('./cookieRouter')
const authRouter = require('./authRouter')
const cartRouter = require('./cartRouter')

const router = Router()

router.get('/',  (req, res) => {
    res.send('Ruta raiz')
})

//RUTAS PARA PRODUCTOS
router.use('/auth', authRouter)
router.use('/cookie', cookieRouter)
router.use('/api/products', productRouter)
router.use('/api/cart', cartRouter)
//router.use('/api/usuarios', userRouter)


module.exports = router