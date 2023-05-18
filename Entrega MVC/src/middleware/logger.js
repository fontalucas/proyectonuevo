const { request } = require('express')
const winston = require('winston')

const sistemLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
}

const logger = winston.createLogger({
    levels: sistemLevels.levels,
    transports: [
        new winston.transports.Console({level: 'debug'}),
        new winston.transports.File({filename: './errors.log', level: 'info'})
    ]
    
})
    const addLogger = (req = request, res, next) => {
        req.logger = logger
        req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next()
    }
module.exports = addLogger