import express from "express";
import { createProductsRouter } from "./routes/products.mjs";
import { createAuthRouter } from "./routes/auth.mjs";
import { ProductModel } from "./models/product.mjs";
import { AuthModel } from "./models/auth.mjs";
import { corsMiddleware } from "./middlewares/cors.mjs";

export const createApp = ({ productModel, authModel }) => {
  const app = express();
  app.disable("x-powered-by");

  app.use(express.json());

  app.use(corsMiddleware());

  app.get("/", (_, res) => {
    res.send("<h1>Bienvenido</h1>");
  });

  // PRODUCTS
  app.use("/auth", createAuthRouter({ authModel }));
  app.use("/products", createProductsRouter({ productModel }));

  return app;
};

export default createApp({
  productModel: ProductModel,
  authModel: AuthModel,
});
