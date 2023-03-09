const { response } = require('express')
const { Router } = require('express')
const UserModel = require('../models/userModel.js')

const router = Router()

// el get trae http://localhost:8080/api/usuarios
router.get('/', async (req, res) => {
    try { 
        const {page = 1 } = req.query
        const {docs, hasPrevPage, hasNextPage, prevPage, NextPage} = await UserModel.paginate({}, {limit: 10, page, lean: true})
        
        const users = docs
        
        res.status(200).render('users',{
            status: 'success',
            users,
            hasPrevPage,
            hasNextPage,
            prevPage,
            NextPage
        })

    }catch(err) {
        console.log(err);
    }
})



//  http://localhost:8080/api/usuarios/id
router.get('/:id', async (req, res) => {
    try { 
        const {id} = req.params
        res.status(200).send({
            status: 'success',
            id
        })
    }catch(err) {
        console.log(err);
    }
})

//  http://localhost:8080/api/usuarios
router.post('/', async (req, res = response) => {
try{

    let {nombre, apellido, email} = req.body
    
    if (!nombre || !apellido || !email) {
        return res.status(404).send({mensaje: 'pasar bien usuarios'})
    }
    let result = await UserModel.create({
        nombre,
        apellido,
        email
    })
    //      console.log(user)
    //    arraydeUsuarios.push(user)
    res.status(201).send({
        result,
        message: 'se creo'
    })
}catch (err) {
    console.log(err);
}
})


//http://localhost:8080/api/usuarios/:userId
router.put('/:uid', async (req, res = response) => {
    try{
        const { uid } = req.params
        let {nombre, apellido, email} = req.body
        
        if (!nombre || !apellido || !email) {
            return res.status(404).send({mensaje: 'pasar bien usuarios'})
        }
        let result = await UserModel.updateOne(
            {_id: uid}, {nombre, apellido}, {new: true}
        )
        //      console.log(user)
        //    arraydeUsuarios.push(user)
        res.status(201).send({
            result,
            status: 'success',
            message: 'se creo'
        })
    }catch (err) {
        console.log(err);
    }
    })




router.delete('/:uid', async (req, res) => {

    const {uid} = req.params
    await UserModel.deleteOne({_id: uid})



    //let arrayTamano = arraydeUsuarios.length
    //let users = arraydeUsuarios.slice(user => user.id !== userId)
    
    res.status(200).send({
        mensaje: 'usuario borrado', 
        result: true, 
        users})
})

module.exports = router