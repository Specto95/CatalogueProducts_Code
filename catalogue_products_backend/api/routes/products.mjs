import { Router } from "express";
import { checkAuth } from '../middlewares/auth/checkAuth.mjs'
import { checkRole } from "../middlewares/checkRole.mjs";
import { isAuth } from "../middlewares/auth/isAuth.mjs";
import { ProductController } from "../controllers/products.mjs";

export const productsRouter = Router();

productsRouter.get("/", isAuth, checkAuth, ProductController.getAll);
productsRouter.post("/", isAuth, checkRole, ProductController.create);
productsRouter.patch("/:id", isAuth, checkRole, ProductController.update);
productsRouter.delete("/:id", isAuth, checkRole, ProductController.delete);
