const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Events",
        required: true,
    },
    positions: {
        type: [{
            type: String,
            enum: ["Flag Post",
                "Tracky",
                "Comms",
                "DigiFlag",
                "Pit Lane",
                "Recovery",
                "Medical",
                "Observer"]
        }],
        required: true,
        validate: {
            validator: value => value.length >= 0,
            message: "Select at least one position."
        }
    },
    assignedPosition: {
        type: String,
        default: null,
    },
    assignedPost: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: [
            "Registered",
            "Assigned",
            "Cancelled",
            "Checked-In",
            "Completed",
            "No-Show"
        ],
        default: "Registered"
    },


}, { timestamps: true })

registrationSchema.index(
    { user: 1, event: 1 },
    { unique: true }
);

const Registration = mongoose.model('Registration', registrationSchema)
module.exports = Registration