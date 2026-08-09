const express = require("express")

const Events = require('../models/events')


const create = async (req, res) => {
    try {
        req.body.createdBy = req.user._id
        if (req.user.role !== 'admin' || req.user.role !== 'orgnizer') {
            return res.status(403).json({err: "Only administrators can create events."})
        }
        const event = await Events.create(req.body)
        event._doc.createdBy = req.user
        res.status(201).json(event)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {

    create,
}















// code grave yeared

// try {

//     res.status(201).json(event)

// } catch (error) {
//     res.status(500).json({ err: err.message })
// }