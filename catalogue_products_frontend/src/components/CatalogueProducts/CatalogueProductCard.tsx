import styles from "./CatalogueProducts.module.css";
import type { CatalogueProductCardProps } from "./interfaces/CatalogueProductCard";
import { MdDelete } from "react-icons/md";

export function CatalogueProductCard({
  product,
  // setProductsData,
}: CatalogueProductCardProps) {
  return (
    <div key={product.id} className={styles.CPW__card}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.CPW__image}
        loading="lazy"
      />
      <div className={styles.CPW__info}>
        <h3 className={styles.CPW__title}>{product.title}</h3>
        <p className={styles.CPW__description}>{product.description}</p>
        <div className={styles.CPW__priceContainer}>
          <MdDelete
            className={styles.CPW__delete}
            onClick={() => {
              if (
                confirm(
                  `Estas seguro de eliminar el producto ${product.title} ?`
                )
              ) {
                // setProductsData((prev) => ({
                //   ...prev,
                //   products: prev.products.filter((p) => p.id !== product.id),
                // }));
              }
            }}
          />
          <p className={styles.CPW__price}>${product.price}</p>
          <p className={styles.CPW__category}>Category: {product.category}</p>
          <p className={styles.CPW__rating}>Rating: {product.rating} / 5</p>
          <p className={styles.CPW__stock}>
            Stock: {product.stock > 0 ? product.stock : "Out of stock"}
          </p>
        </div>
      </div>
    </div>
  );
}
