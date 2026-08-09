const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
   

}, {timestamps: true})

eventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password
    }
})

const Events = mongoose.model('Events', eventSchema)
module.exports = Events