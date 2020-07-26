const Event = require('./../../models/event');
const User = require('./../../models/user');

const { transformEvent } = require('./merge');

module.exports = { //Resolver
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async ({ eventInput }, req) => { //eventInput from args 
    if (!req.isAuth) {
      throw new Error("Unauthorization!");
    }
    const event = new Event({ // Create Event Object
      title: eventInput.title,
      description: eventInput.description,
      price: +eventInput.price,
      date: new Date(eventInput.date),
      creator: req.userId
    });
    let createdEvent;
    try {
      const result = await event.save()
      createdEvent = transformEvent(result);
      const userExist = await User.findById(req.userId);
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
}