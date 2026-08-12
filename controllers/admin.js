const User = require("../models/User")
const Events = require("../models/Events")
const Registration = require("../models/Registration")

// Admin dashboard statistics
const dashboard = async (req, res) => {
    try {
        const totalEvents = await Events.countDocuments()

        const totalUsers = await User.countDocuments()

        const totalMarshals = await User.countDocuments({
            role: "marshal"
        })

        const totalOrganizers = await User.countDocuments({
            role: "organizer"
        })

        const upcomingEvents = await Events.countDocuments({
            eventDate: { $gte: new Date() }
        })

        res.status(200).json({
            totalEvents,
            totalUsers,
            totalMarshals,
            totalOrganizers,
            upcomingEvents
        })

    } catch (error) {
        res.status(500).json({
            err: error.message
        })
    }
}

module.exports = {
    dashboard,
}