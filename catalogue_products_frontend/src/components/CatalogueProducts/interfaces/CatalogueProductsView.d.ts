import type { Product } from "./api/Products";

export interface CatalogueProductsViewProps {
  products: Product[];
  // setProductsData: React.Dispatch<React.SetStateAction<Products>>
}
