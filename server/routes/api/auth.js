const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const User = require("../../models/User")
const auth = require("../../middleware/auth.js")
const mongoose = require("mongoose")

const router = express.Router()

const validator = [
    check("email", "Enter correct email!").isEmail(),
    check("password", "Please enter a password with atleast 6 characters").isLength({min : 6})
]
router.get("/", auth, async(req, res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500)
    }
})

//get user by id
router.get("/:id", auth, async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne({_id : id}).select("-password")
        res.json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500)
    }
})
//login
router.post("/", validator, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()})
    }
    const { email, password} = req.body
    try {
        let user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({errors: [{msg: "No user found"}]})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({errors : [{msg : "Invalid Credentials"}]})
        }
        const payload = {
            user: {
                id : user.id
            }
        }
        jwt.sign(payload, "secret", {expiresIn: 360000}, (err, token) => {
            if(err) throw err
            res.json({token})
        })

    } catch (error) {
        res.status(500).json({error})
    }
})

module.exports = router