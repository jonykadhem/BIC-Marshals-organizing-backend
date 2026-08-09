const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')


const signUp = async (req, res) => {
    try {
        // check if user in database already
        const userInDatabase = await User.findOne({
            $or: [
                {licenseNo: req.body.licenseNo},
                {email: req.body.email}

            ]
        })

        if (userInDatabase) {
            return res.status(409).json({ err: 'A user with this email or license number already exists.' })
        }

        // creates user
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        const userData = {
            fullName: req.body.fullName,
            password: hashedPassword,
            email: req.body.email,
            licenseNo: req.body.licenseNo,
            sector: req.body.sector,
            phone: req.body.phone,
        }

        const user = await User.create(userData)

        // create the payload
        const payload = { fullName: user.fullName, _id: user._id, role: user.role }

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
           $or: [
                {email: req.body.email.toLowerCase()},
                {licenseNo: req.body.licenseNo}

            ]
        })

        if (!userInDatabase) {
            return res.status(404).json({ err: 'Invalid email/license number or password.' })
        }

        // check if the user's password is correct
        const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)

        if (!validPassword) {
            return res.status(401).json({ err: 'Invalid email/license number or password..' })
        }

        const payload = { fullName: userInDatabase.fullName, _id: userInDatabase._id, role: userInDatabase.role }
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