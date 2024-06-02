const express = require('express')
const router = express.Router()

const { Attendant } = require('../Controllers/AttendantController')

router.post("/Attendant/:sectionId", Attendant)

module.exports = router