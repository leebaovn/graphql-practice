const authResolvers = require('./auth');
const eventResolvers = require('./events');
const bookingResolvers = require('./bookings');

//Combine resolvers
const rootResolver = {
  ...authResolvers,
  ...eventResolvers,
  ...bookingResolvers
}

module.exports = rootResolver;