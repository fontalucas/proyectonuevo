const { dirname } = require('path')

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion de app para productos',
            description: 'Documentacion de app para productos'
        }
    },
    apis: [`${dirname(__dirname)}/docs/**/*.yaml`] // doble ** para que tome cualquier doc
}

module.exports = {swaggerOptions}