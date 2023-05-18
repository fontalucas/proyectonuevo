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
    full_name: String,
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
    },
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
})

userSchema.plugin(mongoosePaginate)

const UserModel = model(userCollection, userSchema)

module.exports = UserModel
