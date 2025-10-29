  import { Router } from "express";
  import { checkAuth } from "../middlewares/auth/checkAuth.mjs";
  import { checkRole } from "../middlewares/checkRole.mjs";
  import { isAuth } from "../middlewares/auth/isAuth.mjs";
  import { ProductController } from "../controllers/products.mjs";

  export const createProductsRouter = ({ productModel }) => {
    const productsRouter = Router();

    const productController = new ProductController({ productModel });

    productsRouter.get("/", isAuth, checkAuth, productController.getAll);
    productsRouter.post("/", isAuth, checkRole, productController.create);
    productsRouter.patch("/:id", isAuth, checkRole, productController.update);
    productsRouter.delete("/:id", isAuth, checkRole, productController.delete);

    return productsRouter;
  };
