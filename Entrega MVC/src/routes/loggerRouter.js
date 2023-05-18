const {Router, request}= require('express')

const router = Router()

router.get('/error', (req = request, res ) => {
    req.logger.error();('Esto es un error')
    
})
router.get('/warning', (req = request, res ) => {
    req.logger.warning('')
    res.send()
})  
router.get('/info', (req = request, res ) => {
    req.logger.info('Esto es un info')
    res.send({message: 'Informacion:'})
})
router.get('/http', (req = request, res ) => {
    req.logger.http('Esto es un http')
    res.send({message: 'ruta'})
})  
router.get('/fatal', (req = request, res ) => {
    req.logger.fatal('Esto es un fatal')
    res.send({message: 'Error fatal, vuelve a intentarlo'})
})
router.get('/debug', (req = request, res ) => {
    req.logger.debug('Esto es un debug')
    res.send({message: 'Debug'})
})

module.exports = router