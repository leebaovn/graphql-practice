const authResolvers = require('./auth');
const eventResolvers = require('./events');
const bookingResolvers = require('./bookings');
const productResolvers = require('./products');
//Combine resolvers
const rootResolver = {
  ...authResolvers,
  ...eventResolvers,
  ...bookingResolvers,
  ...productResolvers,
};

module.exports = rootResolver;
