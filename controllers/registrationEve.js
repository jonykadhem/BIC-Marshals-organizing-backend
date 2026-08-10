const Registration = require('../models/registration')
const Events = require('../models/events')


const registrationForEvent = async (req, res) => {

    try {
        const event = await Events.findById(req.params.eventId)
        if(!event){
            return res.status(404).json({
                err: "Event not found."
            })
        }
        if (event.status !== "Open"){
            return res.status(400).json({err: "Registration is closed for this event."})
        }
        if (new Date() > event.registrationDeadline){
            return res.status(400).json({err: "The registration deadline has passed."})
        }
        if(event.maxMarshals)

        
    } catch (error) {
        res.status(500).json({ err: error.message })
    }

}



module.exports = {
    registrationForEvent,
}














// code grave yeared

// try {

//     res.status(201).json(event)

// } catch (error) {
//     res.status(500).json({ err: error.message })
// }