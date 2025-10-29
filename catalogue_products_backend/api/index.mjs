import express from "express";
import cors from "cors";

//const { graphqlHTTP } = require("express-graphql");
//const { schema, rootValue } = require("./schema/schema");

// import { corsMiddleware } from "./middlewares/cors.mjs";
import { createProductsRouter } from "./routes/products.mjs";
import { createAuthRouter } from "./routes/auth.mjs";

export const createApp = ({ productModel, authModel }) => {
  const app = express();
  app.disable("x-powered-by");

  app.use(express.json());

  app.use(cors());

  const PORT = process.env.PORT || 3000;

  app.get("/", (_, res) => {
    res.send("<h1>Bienvenido</h1>");
  });

  // PRODUCTS
  app.use("/auth", createAuthRouter({ authModel }));
  app.use("/products", createProductsRouter({ productModel }));

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
