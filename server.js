const express = require('express')
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { sequelize, user } = require("./UserTable")

const login = require("./login")
const employee = require("./employees")
const salary = require('./salarycalculation')
const attendance = require('./attandance')
const payroll = require("./payrole")

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000;
const JWTSecretKey = process.env.JWT_SECRET_KEY

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const authentication = (req, res, next) => {
  if (req.headers.cookie) {
    const token = req.headers.cookie.split('=')[1];
    if (!token) { return res.status(401).json("unauthorized user") }

    jwt.verify(token, JWTSecretKey, (err, emp) => {
      if (err) {
        return res.status(403).json("invalid token")
      }
    })
    next();
  } else {
    res.status(401).json("unauthorized user")
  }
}


const authRoleBased = (req, res, next) => {
  const { role } = req.body
  if ((role !== "HR") && (role !== "Admin")) {
    return res.status(403).json({ message: 'Forbidden: Access denied' });
  }
  next();
};


app.use('/auth', login)
app.use('/employees', authentication, authRoleBased, employee)
app.use('/salary', authentication, authRoleBased, salary)
app.use('/attendance/mark', authentication, authRoleBased, attendance)
app.use('/payroll', authentication, authRoleBased, payroll)


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})