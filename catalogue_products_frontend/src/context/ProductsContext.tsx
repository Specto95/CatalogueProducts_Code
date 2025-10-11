import React, { createContext, useEffect, useState } from "react";
import type {
  Product,
  Products,
} from "../components/CatalogueProducts/interfaces/api/Products";
import { LIST_PRODUCTS } from "../api/query/listProducts";
import { useQuery } from "@apollo/client/react";
import { useSessionProvider } from "../hooks/useSessionProvider";

type ProductContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isCreating?: boolean;
  setIsCreating?: React.Dispatch<React.SetStateAction<boolean>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ProductsContext = createContext<ProductContextType>(
  {} as ProductContextType
);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const { isUserLogged } = useSessionProvider();

  const { data: productsData } = useQuery<
    { listProducts: Products },
    Record<string, Products>
  >(LIST_PRODUCTS);

  useEffect(() => {
    if (!isUserLogged) {
      setProducts([]);
      return;
    } 
    if (productsData) {
      setProducts(productsData.listProducts.products);
    }
  }, [productsData, isUserLogged]);

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, isCreating, setIsCreating }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
