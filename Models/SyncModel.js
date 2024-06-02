const sequelize = require('../Config/database')

const User = require('./UserModel');
const Event = require('./EventModel');
const Section = require('./SectionModel');
const Attendant = require('./AttendantModel');
const SectionAttendant = require('./SectionAttendantModel');

User.hasMany(Event, { foreignKey: 'userId' });
Event.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Attendant, { foreignKey: 'userId' });
Attendant.belongsTo(User, { foreignKey: 'id' });

Event.hasMany(Section, { foreignKey: 'eventId' });
Section.belongsTo(Event, { foreignKey: 'eventId' });

Event.hasMany(Attendant, { foreignKey: 'eventId' });
Attendant.belongsTo(Event, { foreignKey: 'eventId' });

Section.belongsToMany(Attendant, { through: SectionAttendant, foreignKey: 'sectionId' });
Attendant.belongsToMany(Section, { through: SectionAttendant, foreignKey: 'attendantId' });


module.exports = {
    User,
    Event,
    Section,
    Attendant,
    SectionAttendant,
    sequelize
  };