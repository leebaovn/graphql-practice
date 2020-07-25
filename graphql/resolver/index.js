const bcrypt = require('bcryptjs');

const Event = require('./../../models/event');
const User = require('./../../models/user');

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator)
      }
    })
  } catch (err) {
    throw err;
  }
};

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


module.exports = { //Resolver
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async ({ eventInput }) => { //eventInput from args 
    const event = new Event({ // Create Event Object
      title: eventInput.title,
      description: eventInput.description,
      price: +eventInput.price,
      date: new Date(eventInput.date),
      creator: "5f1c3a78742bf52a486a1939"
    });
    let createdEvent;
    try {
      const result = await event.save()
      createdEvent = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };
      const userExist = await User.findById("5f1c3a78742bf52a486a1939");
      if (!userExist) {
        throw new Error("User not found.");
      }
      userExist.createdEvents.push(event);
      await userExist.save();
      return createdEvent;
    } catch (err) {
      throw err;
    };
  },
  users: async () => {
    try {
      const users = await User.find()
      return users.map(user => {
        return {
          ...user._doc,
          _id: user.id
        }
      })
    } catch (err) {
      throw err;
    }
  },
  createUser: async ({ userInput }) => {
    try {
      const userNew = await User.findOne({ email: userInput.email })
      if (userNew) {
        throw new Error("User already exist.");
      }
      const hashedPwd = await bcrypt.hash(userInput.password, 12); // return hashedPwd
      const user = new User({
        email: userInput.email,
        password: hashedPwd
      });
      const result = await user.save();//Save data
      return { ...result._doc, _id: result.id, password: null }
    } catch (err) { throw err };

  },
}