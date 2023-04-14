const { Router } = require('express')

module.exports = class ClassRouter {
    constructor(){
        this.router = Router()
        this.init()
    }

    getRouter(){
        this.router
    }

    init(){}
        

    applycallback(callback){
            return callback.map(callback => async (...params)=>{
                try {
                    await callback.apply(this, params)
                } catch (error) {
                    params[1].status(500).send(error)
                }
            })
        }
        generateCustomResponses(req, res, next){
            res.sendSuccess = payload =>res.send({ status: 'success', payload })
            res.sendServerError = error =>res.send({ status: 'error', error })
            res.sendUserError = error =>res.send({ status: 'error', error })
            next()
        }
    get(path, ...callback){
        //router.get
        this.router.get(path, this.applycallback(callback))
    }
    post(path, ...callback){
        //router.post
        this.router.post(path, this.generateCustomResponses, this.applycallback(callback))
    }
    put(path, ...callback){
        //router.get
        this.router.put(path, this.generateCustomResponses,this.applycallback(callback))
    }
    delete(path, ...callback){
        //router.get
        this.router.delete(path, this.generateCustomResponses,this.applycallback(callback))
    }
}