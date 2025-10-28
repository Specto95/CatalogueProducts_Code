import express from "express";
import cors from "cors";

//const { graphqlHTTP } = require("express-graphql");
//const { schema, rootValue } = require("./schema/schema");

import { corsMiddleware } from "./middlewares/cors.mjs";
import { productsRouter } from "./routes/products.mjs";
import { authRouter } from "./routes/auth.mjs";

const app = express();
{
}
app.disable("x-powered-by");

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 3000;

// PRODUCTS
app.use("/auth", authRouter);
app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
