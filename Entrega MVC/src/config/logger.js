const winston = require('winston')

const sistemLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}

const logger = winston.createLogger({
    levels: sistemLevels.levels,
    transports: [
        new winston.transports.Console({
            level: 'info', 
            format: winston.format.combine(
                winston.format.colorize({colors: sistemLevels.colors}),
                winston.format.simple())
        }),

        new winston.transports.File({
            filename: './errors.log',
            level: 'warning',
            format: winston.format.simple()
        })
    ]
    
})

module.exports = {
    logger
}