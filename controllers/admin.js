const User = require("../models/user")
const Events = require("../models/events")
const Registration = require("../models/registration")

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
// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
            .select("-password")
            .sort({ createdAt: -1 })

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({
            err: error.message
        })
    }
}

// Change user role
const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params
        const { role } = req.body

        // Only allow these roles to be assigned
        if (!["marshal", "organizer"].includes(role)) {
            return res.status(400).json({
                err: "Invalid role."
            })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                err: "User not found."
            })
        }

        if (user.role === "admin") {
            return res.status(403).json({
                err: "You can't change an admin's role."
            })
        }

        user.role = role

        await user.save()

        const updatedUser = user.toObject()
        delete updatedUser.password

        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json({
            err: error.message
        })
    }
}

module.exports = {
    dashboard,
    getUsers,
    updateUserRole,

}