const { Router } = require('express')
const { authorization } = require('../middleware/authorization')
const { passportCall } = require('../utils/passportCall')
const { usersController } = require('../controller/usersController')





const router = Router()


//router.get('/', passportCall('jwt'), authorization('admin'), async (req, res) =>{

router.get('/', passportCall('jwt'), authorization('admin'), usersController.getAllUsers)
router.post('/', usersController.createUser)




// get http://localhost:8080/api/usuarios /id
router.get('/:id', (request, response) =>{
    const {id} = request.params
    response.status(200).send(id)
})

// POST http://localhost:8080/api/usuarios /


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

