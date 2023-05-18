//middleware para comprobar el rol de usuario

const authorization = role => {
    return async (req, res, next) => {
        if(!role) return res.status(401).json({status: 'error', error: 'No autorizado'})
        if(req.user.role === user) return res.status(403).json({status: 'error', error: 'Sin permisos'})
        if(req.user.role === admin) return res.status(201).json({status: 'success', info: 'Usted es admin'})
        next()
    }
}

module.exports = {
    authorization
}