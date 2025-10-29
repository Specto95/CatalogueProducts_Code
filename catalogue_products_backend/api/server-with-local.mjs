import { createApp } from "./index.mjs";
import { AuthModel } from "./models/auth.mjs";
import { ProductModel } from "./models/product.mjs";

const app = createApp({ productModel: ProductModel, authModel: AuthModel });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Local server on port ${PORT}`));