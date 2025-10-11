import styles from "./CatalogueProducts.module.css";

import { CatalogueProductCard } from "./ProductCard/CatalogueProductCard";
import { useProductsProvider } from "../../hooks/useProductsProvider";
import { CreateProductCardView } from "./ProductCard/Create/CreateProductCardView";
import { CreateProductCard } from "./ProductCard/Create/CreateProductCard";
import { useSessionProvider } from "../../hooks/useSessionProvider";
import { Login } from "../Auth/Login/Login";
import { UserRole } from "../../context/types/User";
import { useState } from "react";
import { MultiFilter } from "./Navbar/Filter/helpers/MultiFilter";
import { FilterContainer } from "./Navbar/Filter/FilterContainer";

export function CatalogueProductsView() {
  const { products, isCreating } = useProductsProvider();
  const [arrowClicked, setArrowClicked] = useState(false);
  const [queryName, setQueryName] = useState("");
  const [queryPriceRange, setQueryPriceRange] = useState<[number, number]>([
    0, 0,
  ]);

  const maxPrice = Math.max(...products.map((pro) => pro.price));
  const minPrice = Math.min(...products.map((pro) => pro.price));

  const { filteredItems: filteredProducts } = MultiFilter(products, [
    { field: "title", query: queryName },
    { field: "price", query: queryPriceRange },
  ]);

  const productsToShow =
    queryName || queryPriceRange ? filteredProducts : products;

  const { isUserLogged, user } = useSessionProvider();

  return !isUserLogged ? (
    <Login />
  ) : (
    <div className={styles.CPW__container}>
      <FilterContainer
        arrowClicked={arrowClicked}
        setArrowClicked={setArrowClicked}
        customDetailsName="Filtros"
        hideDetailsName="Ocultar filtros"
        setQueryName={setQueryName}
        setQueryPriceRange={setQueryPriceRange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        queryName={queryName}
        queryPriceRange={queryPriceRange}
      />
      <div className={styles.CPW__section}>
        <>
          {user.role === UserRole.ADMIN ? (
            isCreating ? (
              <CreateProductCard />
            ) : (
              <CreateProductCardView />
            )
          ) : (
            <></>
          )}

          {productsToShow?.map((pro) => (
            <CatalogueProductCard key={pro.id} product={pro} />
          ))}
        </>
      </div>
    </div>
  );
}
