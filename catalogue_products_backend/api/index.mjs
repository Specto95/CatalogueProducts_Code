import express from "express";
import cors from "cors";
import { createProductsRouter } from "./routes/products.mjs";
import { createAuthRouter } from "./routes/auth.mjs";

export const createApp = ({ productModel, authModel }) => {
  const app = express();
  app.disable("x-powered-by");

  app.use(express.json());

  app.use(cors());


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