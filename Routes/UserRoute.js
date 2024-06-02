const express = require('express')
const router = express.Router()

const { listUser, EditUser, RemoveUser } = require('../Controllers/UserController')
const { auth, roleCheck } = require('../Middlewares/AuthenticateToken')

router.post("/user/list",auth, roleCheck, listUser)
router.put("/user/:userId",auth, roleCheck, EditUser)
router.delete("/user/:userId",auth, roleCheck, RemoveUser)

module.exports = router