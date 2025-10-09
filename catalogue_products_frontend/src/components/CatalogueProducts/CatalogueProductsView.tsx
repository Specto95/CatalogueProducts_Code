import styles from "./CatalogueProducts.module.css";

import { CatalogueProductCard } from "./ProductCard/CatalogueProductCard";
import { useProductsProvider } from "../../hooks/useProductsProvider";
import { CreateProductCardView } from "./ProductCard/Create/CreateProductCardView";
import { CreateProductCard } from "./ProductCard/Create/CreateProductCard";

export function CatalogueProductsView() {
  const { products, isCreating } = useProductsProvider();
  return (
    <div className={styles.CPW__section}>
      <>
        {isCreating ? <CreateProductCard /> : <CreateProductCardView />}
        {products?.map((pro) => (
          <CatalogueProductCard key={pro.id} product={pro} />
        ))}
      </>
    </div>
  );
}
