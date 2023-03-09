const express = require('express')
const {initConnection } = require('./config/conectionMongo')
const useRouter = require('./routes/index')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { Server } = require('socket.io')
const { auth } = require('./middleware/auth.js')

require('dotenv').config()


const app = express()
const PORT = 8080 || process.env.PORT

//----------------------------------------------------------------//
initConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/virtual', express.static(__dirname+'/public'))

/* COOKIES */
app.use(cookieParser('p@l@br@s3cr3t@'))
app.use(session({
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

/* MOTOR PLANTILLAS */
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

/* RUTA RAIZ */
app.use(useRouter)


const httpServer = app.listen(PORT, err => {
if (err) return console.log(err).res.status(500).send('Todo mal')
    console.log(`Servidor ${httpServer.address().PORT} funcionando`)
})

// instanciando socket
const io = new Server(httpServer)


const mensajes = [
    // {user: 'Fede', message: 'Hola como están'}
]
let connectedClients = []

io.on('connection', socket => {
    // console.log('Nuevo cliente conectado')
    connectedClients.push(socket)
    console.log(`Cliente conectado. Total de clientes conectados: ${connectedClients.length}`)

    socket.on('message', data => {
        console.log('message',data)
        mensajes.push(data)
        io.emit('messageLogs', mensajes)
        // persisti 
    })

    socket.on('authenticated', data => {
        
        socket.broadcast.emit('newUserConnected', data)
    })
    
    socket.on('disconnect',()=>{
        connectedClients = connectedClients.filter((client) => client !== socket)
        console.log(`Cliente desconectado. Total de clientes conectados: ${connectedClients.length}`)
    })
})
