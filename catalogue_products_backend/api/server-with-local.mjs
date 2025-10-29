import { createApp } from "./index.mjs";
import { AuthModel } from "./models/auth.mjs";
import { ProductModel } from "./models/product.mjs";

createApp({ productModel: ProductModel, authModel: AuthModel });
