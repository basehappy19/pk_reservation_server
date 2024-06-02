const attendant = require('../Models/attendantModel')
const Event = require('../Models/EventModel')
const sectionAttendant = require('../Models/SectionAttendantModel')
const section = require('../Models/SectionModel')
const User = require('../Models/UserModel')

exports.Attendant = async(req,res) => {
    try {
        const sectionId = parseInt(req.params.sectionId)

        const sectionData = await section.findOne({where: { eventId: sectionId }})
        
        const isPass = await Event.findOne({where: { id: sectionId }})
        if (!sectionData) {
            res.status(404).send("Event not found");
        } else {
            if(isPass.is_enabled == false || isPass.is_show == false) {
                res.json({
                    message:"Event Is Not Enabled",
                    type:"error"
                }).status(400)
            } else {
                const countAttendant = await sectionAttendant.findAndCountAll({where: { sectionId: sectionId }})
                if (countAttendant.count < sectionData.limit) {
                    const data = req.body 
                    const userId = parseInt(data.userId)
                    const canAttendant = await attendant.findOne({ 
                        where: { 
                            userId: userId,
                            eventId: sectionId 
                        }
                    });
                    const haveUser = await User.findOne({where: {id: userId}})
                    if(haveUser) {
                        if(!canAttendant) {

                            const attendantData = {
                                userId: userId,
                                eventId: sectionId
                            }
                            const attendantAdd = await attendant.create(attendantData)
                            const sectionAttendantData = {
                                sectionId: sectionId,
                                attendantId : attendantAdd.id
                            };
                    
                            const sectionAttendantAdd = await sectionAttendant.create(sectionAttendantData)
    
                            res.json({
                                message:"ลงชื่อเรียบร้อย",
                                type:"success"
                            }).status(200)
                        } else {
                            res.json({
                                message:"ชื่อผู้ใช้นี้ลงทะเบียนในรอบนี้ไปแล้ว",
                                type:"error"
                            }).status(400)
                        }
                    } else {
                        res.send("Not Found User Attendant").status(404)
                    }
                } else {
                    res.json({
                        message:"ไม่สามารถเข้าร่วมได้ เต็มจำนวนรับได้",
                        type:"error"
                    }).status(400)
                }
            }
            
        }
    } catch (error) {
        const errorMessages = error.errors ? error.errors.map(e => e.message) : [error.message];
        res.status(500).json({
            message: 'Attendant Error',
            errors: errorMessages
        })
    }
}