const Events = require('../models/events')

const permission = async (req, res, next) => {
     try {
        const event = await Events.findById(req.params.eventId)

        if (!event) {
            return res.status(404).json({
                err: "Event not found."
            })
        }

        const isAdmin = req.user.role === "admin"
        const isOwner = event.createdBy.equals(req.user._id)

        if (!isAdmin && !isOwner) {
            return res.status(403).json({
                err: "You don't have permission to edit this event."
            })
        }

        next()

    } catch (error) {
        res.status(500).json({
            err: error.message
        })
    }
}

module.exports = permission