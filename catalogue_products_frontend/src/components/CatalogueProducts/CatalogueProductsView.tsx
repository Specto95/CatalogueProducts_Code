import styles from "./CatalogueProducts.module.css";

import { CatalogueProductCard } from "./ProductCard/CatalogueProductCard";
import { useProductsProvider } from "../../hooks/useProductsProvider";
import { CreateProductCardView } from "./ProductCard/Create/CreateProductCardView";
import { CreateProductCard } from "./ProductCard/Create/CreateProductCard";
import { useSessionProvider } from "../../hooks/useSessionProvider";
import { Login } from "../Auth/Login/Login";
import { UserRole } from "../../context/types/User";

export function CatalogueProductsView() {
  const { products, isCreating } = useProductsProvider();

  const { isUserLogged, user } = useSessionProvider();

  return !isUserLogged ? (
    <Login />
  ) : (
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

        {products?.map((pro) => (
          <CatalogueProductCard key={pro.id} product={pro} />
        ))}
      </>
    </div>
  );
}
