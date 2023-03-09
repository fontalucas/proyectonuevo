const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const userCollection = 'usuarios'

const userSchema = new Schema({
    first_name: {
        type: String,
        index: true,
        required: true,
    },
    last_name: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    genero: {
        type: String,

    }
})

userSchema.plugin(mongoosePaginate)

let UserModel = model(userCollection, userSchema)

module.exports = UserModel
