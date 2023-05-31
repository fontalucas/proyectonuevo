const express = require('express')
const useRouter = require('./routes/index.js')
const logger = require('morgan')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { Server } = require('socket.io')
const MongoStore = require('connect-mongo') 
const { initializePassport } = require('./middleware/initialPassport')
const passport = require('passport')
const { objConfig } = require('./config/conectionMongo')
const cors = require('cors')
require('dotenv').config()
const nodemailer = require('nodemailer')
const twilio = require('twilio')
const { addLogger } = require('./middleware/logger.js')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')


const app = express()
const PORT = 8080 || process.env.PORT
objConfig.initConnection()

//----------------------------------------------------------------//
app.use(logger())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/virtual', express.static(__dirname+'/public'))


/* PASSPORT */
initializePassport()
app.use(passport.initialize())


/* MOTOR PLANTILLAS */
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

//SESSION
/* const fileStore = FileStore(session)
app.use(session({
    store: new fileStore({ path: __dirname+'/sessions',
    ttl: 100, //vida de la session
    retries: 0}),    

    secret: 's3cr3t0',
    resave: false,
    saveUninitialized: false,
})) */

//MONGO SESSION/
app.use(session(objConfig.session))

/* RUTA RAIZ */
app.use('/', useRouter)

/* const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 578,
    auth: {
        user: 'lukas.fonta@gmail.com',
        pass: 'iemnllsplbyxzxrj',
    },
})
app.get('/api/mail', async (req, res) => {
    try {
        let user = {
            nombre: 'Lucas',
            apellido: 'Fonta'
        }
        let result = await transport.sendMail({
            from: 'Servicio de Node lukas.fonta@gmail.com',
            to: 'lukas.fonta@gmail.com', //'correo al cual enviar'
            subjet: 'Mail de prueba',
            html: `<div>
                    <h1> Bienvenido ${user.nombre} </h1>
                    </div>`,
            // attachments: [
             //   {
            //        path: 'imagenurl'
            //    }
           // ] 
        })
    } catch (error) {
        console.log(error);
    }

})
const twilio_account_sid =  'ACbf17e781eb7ff131d1f50d926dac61b0'
const twilio_auth_token =  '6490f8c57b753a8202e8c6487d6b3a21'
//const twilio_phone_number = process.env.TWILIO_PHONE_NUMBER

const cliente = twilio(twilio_account_sid, twilio_auth_token)
app.get('/api/sms', async (req, res) => {
    try {
        await cliente.messages.create({
            body: 'Esto es un mensaje SMS',
            from: '+16073884868',
            to: '+543424222184',
        })
        res.send({status: 'success', payload: 'mensaje enviado'})
    } catch (error) {
        console.log(error);
    }
}) */


const httpServer = app.listen(PORT, err => {
if (err) return console.log(err).res.status(500).send('Todo mal')
    console.log(`Servidor ${PORT} funcionando`)
})

// instanciando socket
const io = new Server(httpServer)


const mensajes = []
let connectedClients = []

io.on('connection', socket => {
    // console.log('Nuevo cliente conectado')
    connectedClients.push(socket)
    console.log(`Cliente conectado. Total de clientes conectados: ${connectedClients.length}`)

    socket.on('message', data => {
        console.log('message',data)
        mensajes.push(data)
        io.emit('messageLogs', mensajes)
    })

    socket.on('authenticated', data => {
        
        socket.broadcast.emit('newUserConnected', data)
    })
    
    socket.on('disconnect',()=>{
        connectedClients = connectedClients.filter((client) => client !== socket)
        console.log(`Cliente desconectado. Total de clientes conectados: ${connectedClients.length}`)
    })
})
