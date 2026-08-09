const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
   
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
    eventDate:{
        type:Date,
        required:true,
    },
    maxMarshals:{
        type:Number,
        min: 1,
    },
    registrationDeadline: {
    type: Date,
    required: true,
    },
    status: {
    type: String,
    enum: ["Open", "Closed", "Cancelled", "Completed"],
    default: "Open",
    },
    image:{
        type: String,
        default: '',
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },

}, {timestamps: true})

const Events = mongoose.model('Events', eventSchema)
module.exports = Events