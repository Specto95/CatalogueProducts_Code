import type { CatalogueProductsViewProps } from "./interfaces/CatalogueProductsView";

import styles from "./CatalogueProducts.module.css";
import { CatalogueProductCard } from "./CatalogueProductCard";

export function CatalogueProductsView({
  products,
  // setProductsData,
}: CatalogueProductsViewProps) {
  return (
    <div className={styles.CPW__section}>
      {products?.map((pro) => (
        <CatalogueProductCard key={pro.id} product={pro} 
        // setProductsData={setProductsData}
        />
      ))}
    </div>
  );
}
