const {Router} = require('express')
const generateUser = require('../utils/faker')

const router = Router()

router.get('/', async (req, res) => {
    let users = []
    //for para cantidad de users
    for(let i = 0; i < 100; i++) {
        //funcion generarUser()
        users.push(generateUser)
    }
    res.json({
        status: 'success',
        payload: users,
    })
})

module.exports = router