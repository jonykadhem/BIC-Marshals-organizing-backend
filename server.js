const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"])


const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT ? process.env.PORT : "3000"

const authCtrl = require('./controllers/auth')
const usersCtrl = require('./controllers/users')
const eventCtrl = require('./controllers/eventsPost')
const registrationtrl = require('./controllers/registrationEve')

const verifyToken = require('./middleware/verify-token')
const permission = require('./middleware/permetions')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}. 🥭`)
})

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes go here
// app.get('/auth/sign-token', authCtrl.signToken)
// app.get('/auth/verify-token', authCtrl.verifyToken)
app.post('/auth/sign-up', authCtrl.signUp)
app.post('/auth/sign-in', authCtrl.signIn)

app.get('/users', verifyToken, usersCtrl.index)

//events routs 

app.post('/events/new', verifyToken, eventCtrl.create)
app.get('/events',eventCtrl.allEvents)
app.put('/events/:eventId/edit',verifyToken, permission,eventCtrl.edit)
app.get('/events/my-events',verifyToken,registrationtrl.myRegistration)
app.get('/events/:eventId',eventCtrl.eventDetails)
app.delete('/events/:eventId',verifyToken, permission,eventCtrl.deleteEvent)

//registaration routs 

app.post('/events/:eventId/registrations',verifyToken,registrationtrl.registrationForEvent)
app.get('/events/:eventId/registrations',verifyToken,registrationtrl.eventRegistrations )
app.put('/events/:registrationId/assign',verifyToken,permission,registrationtrl.assignPost )
app.put('/events/:registrationId/cancel',verifyToken,registrationtrl.canselRegistration )
app.get("/registrations/my-events/:eventId",verifyToken,registrationtrl.myRegistrationForEvent)
app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}! 😀`)
})