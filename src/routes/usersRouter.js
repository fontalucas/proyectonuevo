const { Router, response } = require('express')
const { authorization } = require('../middleware/authorization')
const { UserModel } = require('../models/userModel')
const { passportCall } = require('../utils/passportCall')



const router = Router()

// get http://localhost:8080/api/usuarios /
router.get('/', passportCall('jwt'), authorization('admin'), async (req, res) =>{
    try {
        const { page = 1 } = req.query
        const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = await UserModel.paginate({ },{limit: 10, page, lean: true})
        // console.log(users)
        // const users = docs
        res.status(200).render('users', {
            users: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page
        })
    } catch (error) {
        console.log(error) 
    }
})

// get http://localhost:8080/api/usuarios /id
router.get('/:id', (request, response) =>{
    const {id} = request.params
    response.status(200).send(id)
})



// POST http://localhost:8080/api/usuarios /
router.post('/', async (req, res = response) =>{
    //mada el  cliente request 
    try {
        let {nombre, apellido, email } = req.body
        if (!nombre || !apellido || !email) {
            return res.status(400).send({ message: 'Che pasar todos los datos'})
        }
        
        let result  = await UsersModel.create({
            nombre,
            apellido,
            email
        })
        // validación
    
        res.status(201).send({ 
            status: 'success',
            result
        })
        
    } catch (error) {
        console.log(error)
    }
})

// PUT http://localhost:8080/api/usuarios /:userId
router.put('/:uid', async (request, response) =>{

    const { uid } = request.params
    // venga el id   

    //mada el  cliente request 
    let { nombre, apellido, email }  = request.body

    if (!nombre || !apellido || !email) {
        return response.status(400).send({ message: 'Che pasar todos los datos'})
    }

    // let result = await UsersModel.findByIdAndUpdate({_id: uid}, { nombre }, { new: true })
    let result = await UsersModel.updateOne({_id: uid}, { nombre })

    response.status(201).send({ 
        status: 'success',
        result : result //-> result
    })
})

// DELETE http://localhost:8080/api/usuarios /:userId
router.delete('/:uid', async (req, res)=> {
    const { uid } = req.params
    await UsersModel.deleteOne({_id: uid})
    
    res.status(200).send({ 
        status: 'success',
        result: true
    })
})

module.exports = router
// export default router

