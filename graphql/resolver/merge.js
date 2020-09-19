const Event = require('./../../models/event');
const User = require('./../../models/user');
const { dateToString } = require('./../../helpers/date');

const DataLoader = require('dataloader');

const eventLoader = new DataLoader((eventIds) => {
  return events(eventIds);
});
const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (eventId) => {
  try {
    const getEvent = await eventLoader.load(eventId.toString());
    return getEvent;
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const userWaiting = await userLoader.load(userId.toString());
    return {
      ...userWaiting._doc,
      _id: userWaiting.id,
      createdEvents: () => eventLoader.loadMany(userWaiting.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator),
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

const transformUser = (user) => {
  return {
    ...user._doc,
    _id: user.id,
    createdEvents: events.bind(this, user.createdEvents),
  };
};

const transformProduct = (prod) => {
  return {
    ...prod._doc,
    _id: prod.id,
  };
};
exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;
exports.transformUser = transformUser;
exports.transformProduct = transformProduct;
