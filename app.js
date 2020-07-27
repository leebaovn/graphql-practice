const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');

//GraphQL core: Schema & Resolver
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');

//Auth middleware
const isAuth = require('./middlewares/isAuth');

const app = express();

app.use(bodyParser.json());


//Allow connect the same host
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth); // Middleware

app.use('/graphql',
  graphqlHttp({
    //Configrue graphql API 
    schema: graphqlSchema,
    rootValue: graphqlResolver,
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
    app.listen(3003);
  })
  .catch(err => console.log(err));
