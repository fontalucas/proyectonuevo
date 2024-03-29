//middleware para comprobar el rol de usuario

const authorization = role => {
    return async (req, res, next) => {
        if(!req.user) return res.status(401).json({status: 'error', error: 'No autorizado'})
        if(req.user.role !== role) return res.status(403).json({status: 'error', error: 'Sin permisos'})
        next()
    }
}

module.exports = {
    authorization
}