const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const userCollection = 'usuarios'

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    password: String,
})

userSchema.plugin(mongoosePaginate)

let UserModel = model(userCollection, userSchema)

module.exports = UserModel
