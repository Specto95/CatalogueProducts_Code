import React, { createContext, useEffect, useRef, useState } from "react";
import type {
  Product,
  Products,
  // Products,
} from "../components/CatalogueProducts/interfaces/api/Products";
// import { LIST_PRODUCTS } from "../api/query/listProducts";
// import { useQuery } from "@apollo/client/react";
import { useSessionProvider } from "../hooks/useSessionProvider";
import { PRODUCT_API } from "./helpers/api";

type ProductContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isCreating?: boolean;
  setIsCreating?: React.Dispatch<React.SetStateAction<boolean>>;
  productsLength: React.RefObject<number>;
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
  const { isUserLogged, token } = useSessionProvider();
  const productsLength = useRef(products.length);

  // const { data: productsData } = useQuery<
  //   { listProducts: Products },
  //   Record<string, Products>
  // >(LIST_PRODUCTS);

  const fetchProducts = async () => {
    const res = await fetch(PRODUCT_API.LIST_PRODUCTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(await res.json())
    const data: {
      data: Products;
    } = await res.json();

    if (res.ok) {
      setProducts(data.data.products);
      productsLength.current = data.data.products.length;
      return data.data;
    }
    const errorMessage = data.data.message || `Error: ${res.status}`;
    alert(errorMessage);
  };

  useEffect(() => {
    if (!isUserLogged) {
      setProducts([]);
      return;
    }
    fetchProducts();
  }, [isUserLogged]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        isCreating,
        setIsCreating,
        productsLength,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
