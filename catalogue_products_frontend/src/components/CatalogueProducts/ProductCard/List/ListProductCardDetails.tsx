import { MdDelete } from "react-icons/md";
import styles from "../../CatalogueProducts.module.css";
import { FaEdit } from "react-icons/fa";
import type { ListProductCardDetailsProps } from "./interfaces/ListProductCardDetails";
// import { handleDelete } from "../../helpers/functions";
// import { useMutation } from "@apollo/client/react";
// import { DELETE_PRODUCT } from "../../../../api/mutation/deleteProduct";
import { useProductsProvider } from "../../../../hooks/useProductsProvider";
import { useSessionProvider } from "../../../../hooks/useSessionProvider";
import { UserRole } from "../../../../context/types/User";
import { PRODUCT_API } from "../../../../context/helpers/api";

export function ListProductCardDetails({
  product,
  setIsUpdatingProduct,
}: ListProductCardDetailsProps) {
  const { setProducts } = useProductsProvider();
  const { user, token } = useSessionProvider();

  const handleDelete = async (id: number) => {
    await fetch(PRODUCT_API.DELETE_PRODUCT(id), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts((prev) => prev.filter((pro) => pro.id !== id));
  };

  return (
    <>
      <h3 className={styles.CPW__title}>{product.title}</h3>
      <p className={styles.CPW__description}>{product.description}</p>
      <div className={styles.CPW__priceContainer}>
        {user.role === UserRole.ADMIN ? (
          <>
            <MdDelete
              className={styles.CPW__delete}
              onClick={() => handleDelete(product.id)}
            />
            <FaEdit
              className={styles.CPW__edit}
              onClick={() => {
                setIsUpdatingProduct(true);
              }}
            />
          </>
        ) : (
          <></>
        )}
        <p className={styles.CPW__price}>${product.price}</p>
        <p className={styles.CPW__category}>Category: {product.category}</p>
        <p className={styles.CPW__rating}>Rating: {product.rating} / 5</p>
      </div>
    </>
  );
}
