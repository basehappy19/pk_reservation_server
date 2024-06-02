const User = require("../Models/UserModel");
const Event = require("../Models/EventModel");
const Section = require("../Models/SectionModel");
const Attendant = require("../Models/AttendantModel");
const SectionAttendant = require("../Models/SectionAttendantModel");

exports.event = async (req, res) => {
  try {
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
    });

    const processedEventData = eventData.map((event) => {
      const sections = event.Sections.map((section) => {
        const attendantCount = section.Attendants.length;
        return {
          ...section.get({ plain: true }),
          attendantCount,
        };
      });
      return {
        ...event.get({ plain: true }),
        Sections: sections,
      };
    });

    res.status(200).send(processedEventData);
  } catch (error) {
    const errorMessages = error.errors
      ? error.errors.map((e) => e.message)
      : [error.message];
    res.status(500).json({
      message: "Event Error",
      errors: errorMessages,
    });
  }
};

exports.eventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const eventData = await Event.findOne({
      where: { id: eventId },
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
    });
    if (!eventData) {
      res.send("Not Found Event").status(404);
    } else {
      const sections = eventData.Sections.map((section) => {
        const attendantCount = section.Attendants.length;
        return {
          ...section.get({ plain: true }),
          attendantCount,
        };
      });

      const processedEventData = {
        ...eventData.get({ plain: true }),
        Sections: sections,
      };
      res.send(processedEventData).status(200);
    }
  } catch (error) {
    const errorMessages = error.errors
      ? error.errors.map((e) => e.message)
      : [error.message];
    res.json({
      message: "Event Error",
      errors: errorMessages,
    });
  }
};

exports.eventByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
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
      where: { userId: userId },
    });

    if (!eventData || eventData.length == 0) {
      return res.status(404).json({ message: "คุณไม่มีโพสต์" });
    }

    const processedEventData = eventData.map((event) => {
      const sections = event.Sections.map((section) => {
        const attendantCount = section.Attendants.length;
        return {
          ...section.get({ plain: true }),
          attendantCount,
        };
      });
      return {
        ...event.get({ plain: true }),
        Sections: sections,
      };
    });
    res.status(200).send(processedEventData);
  } catch (error) {
    const errorMessages = error.errors
      ? error.errors.map((e) => e.message)
      : [error.message];
    res.status(500).json({
      message: "Event ByUser Error",
      errors: errorMessages,
    });
  }
};

exports.AddEvent = async (req, res) => {
  try {
    const eventData = req.body;

    const event = await Event.create(eventData);

    const sectionData = {
      name: eventData.name,
      limit: eventData.limit,
      eventId: event.id,
    };

    const section = await Section.create(sectionData);

    res.json({message:"โพสต์เรียบร้อย", type:"success"}).status(200);
  } catch (error) {
    const errorMessages = error.errors
      ? error.errors.map((e) => e.message)
      : [error.message];
    res.json({
      message: "AddEvent Error",
      errors: errorMessages,
    });
  }
};

exports.EditEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { name, is_enabled, is_show, limit } = req.body;
    const updatedEventData = {
      name,
      is_enabled,
      is_show
    };

    const updatedSectionsData = {
      name,
      limit
    };

    const [eventUpdateCount] = await Event.update(updatedEventData, {
      where: { id: eventId },
    });

    if (eventUpdateCount === 0) {
      return res.status(404).json({message:"Event not found or no fields updated"});
    }

      const sectionUpdateCount = await Section.update(updatedSectionsData,
        { where: { eventId: eventId } }
      );

      if (sectionUpdateCount === 0) {
        return res.status(404).json({message:"Section not found or limit not updated"});
      }
    

    res.status(200).json({message:"อัพเดทข้อมูลโพสต์เรียบร้อย",type:"success"});
  } catch (error) {
    const errorMessages = error.errors
      ? error.errors.map((e) => e.message)
      : [error.message];
    res.status(500).json({
      message: "EditEvent Error",
      errors: errorMessages,
    });
  }
};

exports.RemoveEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const removeEvent = await Event.destroy({ where: { id: eventId } });
    res.send("Remove Event Successfully");
  } catch (error) {
    const errorMessages = error.errors
      ? error.errors.map((e) => e.message)
      : [error.message];
    res.json({
      message: "RemoveEvent Error",
      errors: errorMessages,
    });
  }
};
