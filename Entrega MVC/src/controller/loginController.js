const {UserModel} = require('../models/userModel')
const { createHash, isValidPassword } = require('../utils/bcryptPass.js');

class LoginController {
    
    loginRender = async (req, res)=>{
        res.status(200).render('login')}
        
    loginUser = async (req, res)=>{
            const {email, password} = req.body
            //const user = await UserModel.findOne({email})
            const user = await UserModel.findOne(user => user.email === email && user.password === password)
            if (!user) return res.status(404).send({status: 'error', message: 'Usuario incorrecto'})
            
            const isValidPass = isValidPassword(user, password)

            if (!isValidPass) return res.status(401).send({status: 'error', error: 'Usuario o contraseña incorrectos'})

            console.log('logged in!')

            res.send({status:'success', message: 'Usuario logueado correctamente'})

        }

    registerRender = async (req, res) => {
            res.status(200).render('register')
    }
    registerUser = async (req, res)=>{
            const {first_name, last_name, email, password} = req.body
            const exist = await UserModel.findOne({email})
            if(exist) return res.status(401).send({status: 'error', message: 'usuario existente'})
            
            try {
                if(!first_name || !last_name || !email || !password) {return res.status(401).send({status: 'error', message: 'Llenar bien los campos'})}
                const hashedPassword = createHash(password)
                const user = {
                    first_name,
                    last_name,
                    email,
                    password: hashedPassword
                }
                let result = await UserModel.create(user)

                res.status(200).json({
                    status: 'success',
                    message: 'usuario creado con exito',
                    payload: result,
                })
            }catch(err) {console.log(err)}
    }

    restarPass =  async (req, res) => {
        const { email, password } = req.body
        // Encontrar el usuario por correo electrónico
        const user = await UserModel.findOne({ email });
        if (!user) {
            // Si el usuario no existe, redireccionar a una página de error
            return res.status(401).send({status: 'error', message: 'El usuario no existe'})
        }    
        //Hasear Actualizar la contraseña del usuario
        user.password = createHash(password)
        await user.save()
        // Redireccionar al usuario a la página de login
        res.status(200).json({status: 'success', message:'Contraseña actualizada correctamente'});
    }


    logout =  async (req, res)=>{
        try {
            req.session.destroy(err => {
                if(!err) res.send('logout ok')
                else res.send({status:'Logout error', message: err})
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = LoginController