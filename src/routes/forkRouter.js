const {Router} = require('express')
const {fork} = require('child_process')

const router = Router()


function operacionCompleja(params) {
    let result = 0
    for (let i = 0; i <  5e9; i++) {
        result += i
    }
    return result
}


router.get('/block', (req, res) => {
    //padre
    const result = operacionCompleja()
    res.send(`<center><h1>${result}</h1></center>`)
})

router.get('/noblock', (req, res) => {
    //padre manda hijo escucha y responde
    const child = fork('./src/routes/operacionCompleja.js')
    child.send('Inicia el caluclo por favor')
    child.on('message', result => {
        res.send(`<center><h1>${result}</h1></center>`)
    })

})
module.exports = router