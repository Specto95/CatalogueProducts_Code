import { MdCancel, MdOutlineDone } from "react-icons/md";
import styles from "../../CatalogueProducts.module.css";
import type { ListProductCardDetailsProps } from "../List/interfaces/ListProductCardDetails";
// import { useMutation } from "@apollo/client/react";
import { useProductsProvider } from "../../../../hooks/useProductsProvider";
// import { UPDATE_PRODUCT } from "../../../../api/mutation/updateProduct";
import { useState } from "react";
import { useSessionProvider } from "../../../../hooks/useSessionProvider";
import { UserRole } from "../../../../context/types/User";
import { PRODUCT_API } from "../../../../context/helpers/api";

export function UpdateProductCardDetails({
  product,
  setIsUpdatingProduct,
}: ListProductCardDetailsProps) {
  const { setProducts } = useProductsProvider();
  const { user, token } = useSessionProvider();

  const [editedProduct, setEditedProduct] = useState({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    thumbnail: product.thumbnail,
  });

  const handleSave = async () => {
    const data = {
      title: editedProduct.title,
      description: editedProduct.description,
      price: editedProduct.price,
      category: editedProduct.category,
      thumbnail: product.thumbnail,
    };

    await fetch(PRODUCT_API.UPDATE_PRODUCT(editedProduct.id), {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts((prev) =>
      prev.map((pro) =>
        pro.id === product.id
          ? {
              id: product.id,
              ...data,
            }
          : pro
      )
    );

    setIsUpdatingProduct(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (user.role !== UserRole.ADMIN) return;
        handleSave();
      }}
    >
      <input
        className={styles.CPW__input}
        value={editedProduct.title}
        onChange={(e) =>
          setEditedProduct((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <input
        type="text"
        className={styles.CPW__input}
        value={editedProduct.description}
        onChange={(e) =>
          setEditedProduct((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />
      <div className={styles.CPW__priceContainer}>
        <MdOutlineDone className={styles.CPW__edit} onClick={handleSave} />
        <MdCancel
          className={styles.CPW__delete}
          onClick={() => setIsUpdatingProduct(false)}
        />
        <input
          className={styles.CPW__input}
          type="number"
          value={editedProduct.price}
          onChange={(e) =>
            setEditedProduct((prev) => ({
              ...prev,
              price: parseFloat(e.target.value) || 0,
            }))
          }
        />
        <select
          className={styles.CPW__input}
          value={editedProduct.category}
          onChange={(e) =>
            setEditedProduct((prev) => ({
              ...prev,
              category: e.target.value,
            }))
          }
        >
          <option
            defaultChecked={product.category === "smartphones"}
            value="beauty"
          >
            beauty
          </option>
          <option
            defaultChecked={product.category === "laptops"}
            value="fragances"
          >
            fragances
          </option>
          <option
            defaultChecked={product.category === "fragrances"}
            value="furniture"
          >
            furniture
          </option>

          <option
            defaultChecked={product.category === "groceries"}
            value="groceries"
          >
            groceries
          </option>
        </select>
        <p className={styles.CPW__rating}>Rating: {product.rating} / 5</p>
      </div>
    </form>
  );
}
