const {Router} = require('express')
const {generateUser, generateProducts} = require('../utils/faker')

const router = Router()

router.get('/products', async (req, res) => {
    let products = []
    for (let i = 0; i < 100; i++) {
        let product = generateProducts()
        products.push(product)
    }
    res.send({
        status: 'ok',
        payload: products
    })
})
router.get('/users', async (req, res) => {
    let users = []
    //for para cantidad de users
    for(let i = 0; i < 100; i++) {
        //funcion generarUser()
        users.push(generateUser())
    }
    res.json({
        status: 'success',
        payload: users,
    })
})

module.exports = router