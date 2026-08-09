const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')


const signUp = async (req, res) => {
    try {
        // check if user in database already
        const userInDatabase = await User.findOne({
            licenseNo: req.body.licenseNo
        })

        if (userInDatabase) {
            return res.status(409).json({ err: 'The user is available' })
        }

        // creates user
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        const userData = {
            fullName: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            licenseNo: req.body.licenseNo,
            sector: req.body.sector,
            phone: req.body.phone,
            role: req.body.role,
            profileImage: req.body.profileImage,
        }

        const user = await User.create(userData)

        // create the payload
        const payload = { fullName: user.fullName, _id: user._id }

        // create the token with payload + secret
        const token = jwt.sign({payload}, process.env.JWT_SECRET)

        res.status(201).json({ token })
    } catch(err) {
        res.status(400).json({ err: err.message })
    }
}

const signIn = async (req, res) => {
    try {
        // check if user in database already
        const userInDatabase = await User.findOne({
            fullName: req.body.fullName
        })

        if (!userInDatabase) {
            return res.status(404).json({ err: 'User does not exist.' })
        }

        // check if the user's password is correct
        const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)

        if (!validPassword) {
            return res.status(401).json({ err: 'Login failed. Please try again.' })
        }

        const payload = { fullName: userInDatabase.fullName, _id: userInDatabase._id }
        const token = jwt.sign({ payload }, process.env.JWT_SECRET)

        res.status(200).json({ token })

    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

module.exports = {

    signUp,
    signIn,
}