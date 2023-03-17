const jwt = require('jsonwebtoken');

const PRIVATE_KEY = 'CoderKeyQueFuncionaCOmoUnSecret'

const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'})
    return token
}
const addToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader){
        return res.status(401).json({status: 'error', error: 'No autorizado'})
    }
    const token = authHeader.split(' ')[1]

    jwt.verify(token, PRIVATE_KEY, (error, credential) => {
        if(error){
            return res.status(403).json({status: 'error', error: 'no aut'
        })
        }
        req.user = credential.user
        next()
    })
}
module.exports = {
    PRIVATE_KEY,
    generateToken,
    authToken
}