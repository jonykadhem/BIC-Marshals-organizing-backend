const Registration = require('../models/registration')
const Events = require('../models/events')


const registrationForEvent = async (req, res) => {

    try {
        const event = await Events.findById(req.params.eventId)
        if (!event) {
            return res.status(404).json({
                err: "Event not found."
            })
        }
        if (event.status !== "Open") {
            return res.status(400).json({ err: "Registration is closed for this event." })
        }
        if (new Date() > event.registrationDeadline) {
            return res.status(400).json({ err: "The registration deadline has passed." })
        }

        const registrationCount = await Registration.countDocuments({ event: event._id })

        if (registrationCount >= event.maxMarshals) {
            return res.status(400).json({ err: "The event is full" })
        }

        const existingRegistration = await Registration.findOne({
            user: req.user._id,
            event: req.params.eventId
        })

        if (existingRegistration) {
            return res.status(400).json({ err: "You are alrady regesterd for the event" })
        }

        const registration = await Registration.create({
            user: req.user._id,
            event: req.params.eventId,
            positions: req.body.positions
        })

        res.status(201).json({
            message: "You have registred seccefully",
            registration

        })

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                err: error.message
            });
        }
        res.status(500).json({ err: error.message })
    }

}

const myRegistration = async (req, res) => {

    try {

        const registration = await Registration.find({
            user: req.user._id
        })
        .populate("event")
        .sort({createdAt: -1})
        res.status(200).json(registration)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

const canselRegistration = async (req, res) => {

}



module.exports = {
    registrationForEvent,
    myRegistration,
    canselRegistration
}














// code grave yeared

// try {

//     res.status(201).json(event)

// } catch (error) {
//     res.status(500).json({ err: error.message })
// }