const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
  //Configrue graphql API 
  schema: buildSchema(`
    type Event{
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput{ 
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery{
      events: [Event!]!
    }

    type RootMutation{
      createEvent(eventInput: EventInput!): Event
    }

    schema{
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: { //Resolver
    events: () => {
      return Event
        .find()
        .then(events => {
          return events.map(event => {
            return {
              ...event._doc,
              _id: event.id
            };
          });
        })
        .catch()
    },
    createEvent: ({ eventInput }) => { //eventInput from args 
      const event = new Event({ // Create Event Object
        title: eventInput.title,
        description: eventInput.description,
        price: +eventInput.price,
        date: new Date(eventInput.date)
      });
      return event
        .save()
        .then(result => {
          console.log(result);
          return { ...result._doc, _id: result._doc._id.toString() };
        })
        .catch(err => console.log(err));
    }
  },
  graphiql: true, // turn on playground
}));

//Connect to mongoDb
mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.wja9u.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  .then(() => {
    console.log('connect to mongo is ok')
    app.listen(3000);
  })
  .catch(err => console.log(err));
