const express = require('express')
const router = express.Router()

const { addUser, login } = require('../Controllers/AuthController')
const { roleCheck, auth } = require('../Middlewares/AuthenticateToken')

router.post("/login", login)
router.post("/user",auth, roleCheck, addUser)

module.exports = router