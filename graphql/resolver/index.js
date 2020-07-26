const authResolvers = require('./auth');
const eventResolvers = require('./events');
const bookingResolvers = require('./bookings');

const rootResolver = {
  ...authResolvers,
  ...eventResolvers,
  ...bookingResolvers
}

module.exports = rootResolver;