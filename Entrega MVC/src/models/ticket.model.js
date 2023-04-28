const {Schema, model} = require('mogoose')

const ticketCollection = 'ticket'

const ticketSchema = new Schema({
    code: {
        tpye: String,
        unique: true,
    },
    purchase_datetime: {
        created_at: Date,
    },
    amount: {
        type: Number,
        totalPrice: Number,
    },
    purchaser: {
        type: String,
        user: {
            email: String,
        },
        require: true        
    }
})

const TicketModel = model(ticketCollection, ticketSchema)

module.exports = TicketModel