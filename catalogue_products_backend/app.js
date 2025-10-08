const express = require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/graphql', graphQlHttp({
    schema: require('./schema/schema'),
    graphiql: true
}));


// In-memory data store
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})