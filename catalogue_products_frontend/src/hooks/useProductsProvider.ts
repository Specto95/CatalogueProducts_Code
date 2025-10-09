import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export function useProductsProvider() {
  return useContext(ProductsContext);
}
