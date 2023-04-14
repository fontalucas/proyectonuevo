const jwt = require('jsonwebtoken');

const PRIVATE_KEY = 'CoderKeyQueFuncionaCOmoUnSecret'

const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '1h'})
    return token
}
//console.log(generateToken({nombre: 'Lucas'}));

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader){
        return res.status(401).json({status: 'error', error: 'No autorizado'})
    }
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5vbWJyZSI6Ikx1Y2FzIn0sImlhdCI6MTY4MDI4MDY4NywiZXhwIjoxNjgwMjg0Mjg3fQ.rsUwrUQZe9mck_j3nX53I4XIApkt5IBa2d8-2lFMUT4
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