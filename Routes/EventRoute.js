const express = require('express')
const router = express.Router()
const { event, eventById, AddEvent , EditEvent, RemoveEvent, eventByUser } = require('../Controllers/EventController')
const { auth, eventCheckByUser, eventEditCheckByUser, eventRemoveCheckByUser } = require('../Middlewares/AuthenticateToken')

router.get("/event", event)
router.get("/event/d/:eventId", eventById)
router.post("/event/u/:userId",auth, eventCheckByUser , eventByUser)
router.post("/event",auth, AddEvent)
router.put("/event/e/:eventId",auth, eventEditCheckByUser, EditEvent)
router.delete("/event/d/:eventId",auth,eventRemoveCheckByUser, RemoveEvent)

module.exports = router