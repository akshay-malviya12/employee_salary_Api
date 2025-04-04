const express = require("express")
const cookieParser = require("cookie-parser");
require('dotenv').config();

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const user = require("./UserTable")

const router = express.Router();
router.use(cookieParser());

const JWTSecretKey = process.env.JWT_SECRET_KEY

router.post('/login', async (req, res) => {
    const { email, password, type } = req.body
    if (!email || !password) {
        return res.status(400).json({ "error": "please  fill username and password." })
    }

    const userdata = await user.findOne({ where: { email: email } })
    if (!userdata) {
        return res.status(400).json({ "error": "Invalid user email" })
    }

    const passwordMatch = await bcrypt.compare(password, userdata.password)
    if (!passwordMatch) {
        return res.status(400).json({ "error": "Invalid password" })
    }

    const token = jwt.sign({ id: user.id, name: user.name, Type: user.Type },
        JWTSecretKey, { expiresIn: '1h' });

    return res
        .cookie("authToken", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Logged in successfully" });
})

router.post('/logout', (req, res) => {  
    res.clearCookie("authToken")
    res.json({ "Message": "logout successfully" })
})

module.exports = router;