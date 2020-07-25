const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');

const app = express();

app.use(bodyParser.json());


app.use('/graphql', graphqlHttp({
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
    app.listen(3000);
  })
  .catch(err => console.log(err));
