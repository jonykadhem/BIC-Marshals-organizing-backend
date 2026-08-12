const Registration = require("../models/registration")
const Events = require("../models/events")

const registrationPermission = async (req, res, next) => {
    try {
        const registration = await Registration.findById(
            req.params.registrationId
        )

        if (!registration) {
            return res.status(404).json({
                err: "Registration not found."
            })
        }

        const event = await Events.findById(registration.event)

        if (!event) {
            return res.status(404).json({
                err: "Event not found."
            })
        }

        const isAdmin = req.user.role === "admin"

        const isOwner =
            req.user.role === "organizer" &&
            event.createdBy.equals(req.user._id)

        if (!isAdmin && !isOwner) {
            return res.status(403).json({
                err: "You don't have permission to assign posts."
            })
        }

        next()

    } catch (error) {
        res.status(500).json({
            err: error.message
        })
    }
}

module.exports = registrationPermission