const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Booking{
  _id: ID!
  event: Event!
  user: User!
  createdAt: String!
  updatedAt: String!
}

type Event{
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: User!
}

input EventInput{ 
  title: String!
  description: String!
  price: Float!
  date: String!
}

type User{
  _id: ID!
  email: String!
  password: String
  createdEvents: [Event!]
}

type AuthData{
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input UserInput{
  email: String!
  password: String!
}

input ProductInput{
  name: String!
  description: String!
  price: Float!
  discount: Float
}

type Product{
  _id: ID!
  name: String!
  description: String!
  price: Float!
  discount:Float
}

type RootQuery{
  events: [Event!]!
  users: [User!]!
  bookings: [Booking!]!
  login(email: String, password: String!): AuthData!
  products : [Product]
}

type RootMutation{
  createEvent(eventInput: EventInput!): Event
  createUser(userInput: UserInput!): User
  bookEvent(eventId: ID!): Booking!
  cancelBooking(bookingId: ID!): Event!
  createProduct(product: ProductInput!): Product
}

schema{
  query: RootQuery
  mutation: RootMutation
}
`);
