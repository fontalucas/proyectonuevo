const { connect } = require('mongoose')
const MongoStore = require('connect-mongo') 
const dotenv = require('dotenv')
const { commander } = require('../utils/commander')


//const CartModel = require('../models/cart.model')
//const OrderModel = require('../models/order.model')
//const ProductModel = require('../models/productos.model')
//const UserModel = require('../models/userModel')
/* const ordenes = [
        {
            name: "Margherita",
            size: "small",
            price: 8,
            quantity: 2,
            date: "2021-01-13T09:08:13Z"
        },
        {
            name: "Pepperoni",
            size: "medium",
            price: 12,
            quantity: 1,
            date: "2020-05-13T09:08:13Z"
        },
        {
            name: "Hawaiian",
            size: "medium",
            price: 16,
            quantity: 3,
            date: "2022-03-11T09:08:13Z"
        },
    
        {
            name: "Hawaiian",
            size: "large",
            price: 16,
            quantity: 3,
            date: "2022-03-14T09:08:13Z"
        },
        {
            name: "Margherita",
            size: "large",
            price: 16,
            quantity: 3,
            date: "2022-03-11T09:08:12Z"
        },
        {
            name: "Pepperoni",
            size: "large",
            price: 16,
            quantity: 3,
            date: "2022-03-15T09:08:13Z"
        },
        {
            name: "Pepperoni",
            size: "large",
            price: 25,
            quantity: 3,
            date: "2022-03-18T09:08:12Z"
        },
        {
            name: "Margherita",
            size: "large",
            price: 30,
            quantity: 3,
            date: "2022-03-21T09:08:12Z"
        }
        ]; */

//const environments = 'PRODUCTION'
// -----------------------     CLASE DE PROCESS ------------------
/* const {mode} = commander.opts()
dotenv.config({
    path: mode === 'DEVELOPMENT' ? './.env.development' : './.env.production'
}) */

// const url = process.env.MONGO_URL


/* const objConfig = {
    port: process.env.port || 8080,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,

    initConnection: async () => {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    },
    session: {  
        store: MongoStore.create({
            mongoUrl: url,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }, ttl: 150000
        }),
        secret: 's3cr3t0',
        resave: false,
        saveUninitialized: false,
    }
} */
    const url = 'mongodb+srv://realburger:safonereal2021@ecommerce.1cxhfed.mongodb.net/ecommerce'

    const initConnection = async () => {
        try{
        await connect(url)
        console.log('Connecting')

        /* //solicitar ordenes//
        let result = await OrderModel.find({...ordenes})
        console.log(result) */
    //insertar ordenes//
        //let result = await OrderModel.insertMany(ordenes)
       //console.log(result) 
/*
    -------------------------
    
    //solicitar ordenes//
        let result = await orderModel.find({})
        console.log(result)
    --------------------------
    //diferentes pasos//
        let orders = await OrderModel.aggregate([{
            //filtro
            $match: {size: "medium"}
        }, 
        {
            //agrupa por referencia armando un objeto
            $group: {_id: "$name", totalQuantity: {$sum: "$quantity"}}
        },
        {
            //ordena de manera descendente o ascendente
            $sort: {totalQuantity: -1}
        },
        {
            //
            $group: {_id: 1, orders: {$push: '$$ROOT'}}
        },
        {
            //el id lo crea mongo
            $project: {
                '_id': 0,
                orders: '$orders'
            }
        },
        {
            $merge: {
                into: 'reports'
            }
        }
            ])
        console.log(orders) */
        //let users = await UserModel.paginate({genero: 'Female'}, {Limit: 20, page: 1})
        //console.log(users)
    }catch (error) {
        console.error(error)
        process.exit()
    }
}

module.exports = {initConnection}



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