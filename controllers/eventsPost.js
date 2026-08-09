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
        const event = await Events.find({})
            .populate("createdBy")
            .sort({ createdAt: "desc" })
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

const edit = async (req, res) => {
    try {


        const editevent = await Events.findByIdAndUpdate(
            req.params.eventId,
            {
                title: req.body.title,
                description: req.body.description,
                location: req.body.location,
                eventDate: req.body.eventDate,
                registrationDeadline: req.body.registrationDeadline,
                maxMarshals: req.body.maxMarshals,

            },
            {
                new: true,
                runValidators: true,
            }

        )
        if (!editevent) {
            return res.status(404).json({
                err: "Event not found."
            });
        }

        res.status(200).json(editevent)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

const eventDetails = async (req, res) => {

    try {

        const event = await Events.findById(req.params.eventId)
        

        res.status(20).json(event)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

const deleteEvent = async (req, res) => {
    try {
        const event = await Events.findById(req.params.eventId)

        const deleteEvent = await Events.findByIdAndDelete(req.params.eventId)
        if (!deleteEvent) {
            return res.status(404).json({
                err: "Event not found."
            });
        }

        res.status(200).json(deleteEvent, "Event deleted successfully")
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

module.exports = {
    edit,
    create,
    allEvents,
    deleteEvent,
    eventDetails
}















// code grave yeared

// try {

//     res.status(201).json(event)

// } catch (error) {
//     res.status(500).json({ err: error.message })
// }