const { connect } = require('mongoose')
const MongoStore = require('connect-mongo') 
const dotenv = require('dotenv')
const { commander } = require('../utils/commander')
const {mode} = commander.opts()

const environments = mode || 'PRODUCTION'
// -----------------------     CLASE DE PROCESS ------------------
dotenv.config({
    path: environments === 'development' ? './.env.development' : './.env.production'
})

const url = process.env.MONGO_URL || 'mongodb+srv://realburger:safonereal2021@ecommerce.1cxhfed.mongodb.net/ecommerce'


const objConfig = {
    PORT: process.env.PORT,
    MONGO_URL: url,
    adminName: process.env.ADMIN_NAME || 'admin',
    adminPassword: process.env.ADMIN_PASSWORD || 'admin',
    persistence: process.env.PERSISTENCE,

    initConnection: async () => {
        try{
            await connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log('Connecting Mongo')
        }catch (error) {
            console.error(error)
            process.exit()
    }
},
    session: {  
        store: MongoStore.create({
            mongoUrl: url,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        }),
        secret: 's3cr3t0',
        resave: false,
        saveUninitialized: false,
    }
}

module.exports = {objConfig}


//const url = 'mongodb+srv://realburger:safonereal2021@ecommerce.1cxhfed.mongodb.net/ecommerce'

/* Clase mongo */
/* let resp = await UserModel.find().explain('executionStats')
console.log(resp.executionStats) */
//
//const resp = await CartModel.create({})
//console.log(resp)

/* const cart = await CartModel.find({_id: '63fe933c5aa77c6c976cfe91'})
cart.products.push({product: '63fe8f6e8ed1c7163c2cfeb4'})
console.log(JSON.stringify(cart, null, 2)) */

//let resp = await CartModel.findOneAndUpdate()

//const resp = await ProductModel.findById(/* aca va el  _id */)
//console.log(resp)