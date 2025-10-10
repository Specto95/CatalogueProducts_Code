// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { schema, rootValue } = require("./schema/schema");

const isAuth = require("./middlewares/isAuth");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const PORT = process.env.PORT || 3000;


app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
