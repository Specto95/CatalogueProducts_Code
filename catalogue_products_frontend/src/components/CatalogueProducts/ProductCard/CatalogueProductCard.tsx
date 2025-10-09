import styles from "../CatalogueProducts.module.css";
import type { CatalogueProductCardProps } from "../interfaces/CatalogueProductCard";

import { useState, lazy } from "react";

const ListProductCardDetails = lazy(() =>
  import("./List/ListProductCardDetails").then((module) => ({
    default: module.ListProductCardDetails,
  }))
);

const UpdateProductCardDetails = lazy(() =>
  import("./Update/UpdateProductCardDetails").then((module) => ({
    default: module.UpdateProductCardDetails,
  }))
);

export function CatalogueProductCard({ product }: CatalogueProductCardProps) {
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);

  return (
    <div
      key={product.id}
      className={isUpdatingProduct ? styles.CPW__editCard : styles.CPW__card}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.CPW__image}
        loading="lazy"
      />
      <div className={styles.CPW__info}>
        {isUpdatingProduct ? (
          <UpdateProductCardDetails
            product={product}
            setIsUpdatingProduct={setIsUpdatingProduct}
          />
        ) : (
          <ListProductCardDetails
            product={product}
            setIsUpdatingProduct={setIsUpdatingProduct}
          />
        )}
      </div>
    </div>
  );
}
