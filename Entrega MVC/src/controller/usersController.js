const { response } = require('express')
const userService = require('../service/index')


class UsersController  {
    createUser = async (req, res = response) => {
            //mada el  cliente request 
            try {
                let {nombre, apellido, email } = req.body
                if (!nombre || !apellido || !email || !password) {
                    return res.status(400).send({ message: 'Pasar todos los datos'})
                }
                let result  = await userService.createUser({
                    nombre,
                    apellido,
                    email,
                    password: `${nombre+apellido}`
                })
                // validación
            
                res.status(201).send({ 
                    status: 'success',
                    result
                })
            } catch (error) {
                console.log(error)
            }
    }


    getAllUsers = async (req, res) => {
        try {
            const { page = 1 } = req.query
            const { docs } = await userService.getAllUsers()
    
            res.status(200).render('users', {
                users: docs,
                page
            })
        } catch (error) {
            console.log(error) 
        }
    }

    getUser = async (req, res) => {
        try {
            const {id} = req.params
            let user = await userService.getUser(id)
            res.status(200).send(user)
        } catch (error) {
            console.log(error);
        }
    
    }
}

module.exports = new UsersController()