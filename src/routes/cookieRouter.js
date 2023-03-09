const { Router} = require('express')

const router = Router()

router.get('/set', (req, res) => {
    res.cookie('nombre', 'valor', {maxAge: 111111111}).send('cookie seteada')
}
)

router.get('/setSigned', (req, res) => {
    res.cookie('nombre', 'valor', {maxAge: 54545456, signed: true}).send('cookie firmada')
})

router.get('/get', (req, res) => {
    res.send(req.cookies)
}
)

router.get('/delete', (req, res) => {
    res.clearCookie('nombre').send('cookie borrada')
}
)

module.exports = router