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
require('dotenv').config()


const app = express()
objConfig.initConnection()
const PORT = 8080 || process.env.PORT

//----------------------------------------------------------------//

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(logger('dev'))
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

/* COOKIES */
app.use(cookieParser('p@l@br@s3cr3t@'))
app.use(session({
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

/* RUTA RAIZ */
app.use('/', useRouter)


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
