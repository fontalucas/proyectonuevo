const { Router } = require('express')
const productRouter = require('./productosRouter.js')
const userRouter = require('./usersRouter')
const cookieRouter = require('./cookieRouter')
const authRouter = require('./authRouter')


const router = Router()

router.get('/',  (req, res) => {
    res.send('Ruta raiz')
})

//RUTAS PARA PRODUCTOS
router.use('/auth', authRouter)
router.use('/cookie', cookieRouter)
router.use('/api/productos', productRouter)
router.use('/api/usuarios', userRouter)


module.exports = router