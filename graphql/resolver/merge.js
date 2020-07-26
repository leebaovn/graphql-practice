const Event = require('./../../models/event');
const User = require('./../../models/user');
const { dateToString } = require('./../../helpers/date');

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(event => {
      return transformEvent(event);
    })
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const getEvent = await Event.findById(eventId);
    return transformEvent(getEvent);
  } catch (err) {
    throw err;
  }
}

const user = async userId => {
  try {
    const userWaiting = await User.findById(userId)
    return {
      ...userWaiting._doc,
      _id: userWaiting.id,
      createdEvents: events.bind(this, userWaiting.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  };
}

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  }
}

const transformUser = user => {
  return {
    ...user._doc,
    _id: user.id,
    createdEvents: events.bind(this, user.createdEvents)
  };
}
exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;
exports.transformUser = transformUser;