require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel")
const Event = require("../Models/EventModel");
const Section = require("../Models/SectionModel");
const Attendant = require("../Models/AttendantModel");
const SectionAttendant = require("../Models/SectionAttendantModel");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["auth"];
    if (!token) {
      res.status(401).json({message:"No Token",type:"error"});
    } else {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded.user;
      next();
    }
  } catch (err) {
    res.send("Token Invalid").status(500);
  }
};

exports.eventCheckByUser = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const userIdToFind = parseInt(req.params.userId);
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Section,
          include: [
            {
              model: Attendant,
              through: {
                model: SectionAttendant,
                attributes: [],
              },
              include: [
                {
                  model: User,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
      where: { userId: userIdToFind },
    });

    const isEventOwnedByUser = eventData.some(event => event.userId === userId);

    if (!isEventOwnedByUser) {
      res.status(403).send('Is Not Event You Created');
    } else {
      next();
    }
  } catch (err) {
    res.status(403).send('Is Not Event You Created');
  }
};

exports.eventEditCheckByUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.body.userId);
    const eventIdToFind = parseInt(req.params.eventId);
    const eventData = await Event.findOne({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Section,
          include: [
            {
              model: Attendant,
              through: {
                model: SectionAttendant,
                attributes: [],
              },
              include: [
                {
                  model: User,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
      where: { id: eventIdToFind },
    });
    if (!eventData) {
      return res.status(404).send('Event Not Found');
    }
    if (eventData.userId !== userId) {
      res.status(403).send('Is Not Event You Created');
    } else {
      next();
    }
  } catch (err) {
    res.status(403).send('Is Not Event You Created');
  }
};

exports.eventRemoveCheckByUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.body.userId);
    const eventIdToFind = parseInt(req.params.eventId);
    const eventData = await Event.findOne({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Section,
          include: [
            {
              model: Attendant,
              through: {
                model: SectionAttendant,
                attributes: [],
              },
              include: [
                {
                  model: User,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
      where: { id: eventIdToFind },
    });
    if (!eventData) {
      return res.status(404).send('Event Not Found');
    }
    if (eventData.userId !== userId) {
      res.status(403).send('Is Not Event You Created');
    } else {
      next();
    }
  } catch (err) {
    res.status(403).send('Is Not Event You Created');
  }
};

exports.roleCheck = async(req,res,next)=>{
  try{
      const userId = parseInt(req.body.userId)
      const user = await User.findOne({where: { id:userId }})
      if(user.canManageUsers !== true){
          res.status(403).send('access Denied')
      } else {
          next()
      }

  }catch(err){
      res.status(403).send('access Denied')
  }
}