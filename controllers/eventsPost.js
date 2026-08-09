const express = require("express")

const Events = require('../models/events')


const create = async (req, res) => {
    console.log(req.user)

    try {
        req.body.createdBy = req._id
        if (req.user.role !== 'admin' && req.user.role !== 'orgnizer') {
            return res.status(403).json({ err: "Only administrators can create events." })
        }
        const eventData = { ...req.body, createdBy: req.user._id }
        const event = await Events.create(eventData)
        // event._doc.createdBy = req.user
        res.status(201).json(event)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const allEvents = async (req, res) => {
    try {
        const events = await Events.find({})
        .populate("createdBy")
        .sort({createdAt: "desc"})
        res.status(201).json(event)
    } catch (error) {
        res.status(500).json({ err: err.message })
    }
}

// const edit = async (req, res) => {

// }

// const eventDetails = async (req, res) => {

// }

// const deleteEvent = async (req, res) => {

// }

module.exports = {
    // edit,
    create,
    allEvents,
    // eventDetails
}















// code grave yeared

// try {

//     res.status(201).json(event)

// } catch (error) {
//     res.status(500).json({ err: err.message })
// }