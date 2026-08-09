const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    licenseNo: {
        type: Number,
        required: true,
        trim: true,
        unique:true,
    },
    sector: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    role:{
        type: String,
        enum: ["admin", "marshal", 'orgnizer'],
        default: "marshal",
    },
     profileImage: {
        type: String,
        default: "",
    },

}, {timestamps: true})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User