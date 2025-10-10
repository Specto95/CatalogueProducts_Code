import { MdCancel, MdOutlineDone } from "react-icons/md";
import styles from "../../CatalogueProducts.module.css";
import type { ListProductCardDetailsProps } from "../List/interfaces/ListProductCardDetails";
import { useMutation } from "@apollo/client/react";
import { useProductsProvider } from "../../../../hooks/useProductsProvider";
import { UPDATE_PRODUCT } from "../../../../api/mutation/updateProduct";
import { useState } from "react";
// import { useFormik } from "formik";
// import { productSchema } from "../Create/formProps/schema/productSchema";

export function UpdateProductCardDetails({
  product,
  setIsUpdatingProduct,
}: ListProductCardDetailsProps) {
  const { setProducts } = useProductsProvider();

  const [editedProduct, setEditedProduct] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    thumbnail: product.thumbnail,
  });

  const [updateProduct] = useMutation<{ updateProduct: typeof product }>(UPDATE_PRODUCT, {
    onCompleted: (data) => {
      setProducts((prev) =>
        prev.map((pro) => (pro.id === product.id ? data.updateProduct : pro))
      );
    },
  });

  const handleSave = () => {
    updateProduct({
      variables: {
        id: product.id,
        input: {
          title: editedProduct.title,
          description: editedProduct.description,
          price: editedProduct.price,
          category: editedProduct.category,
          thumbnail: product.thumbnail,
        },
      },
    });

    setIsUpdatingProduct(false);
  };

  // const formik = useFormik({
  //   initialValues: {...editedProduct},
  //   validationSchema: productSchema,
  //   onSubmit: async (values, { resetForm }) => {
  //     handleCreate(values);
  //     resetForm();
  //     alert("Producto creado con éxito!");
  //     setIsCreating!(false);
  //   },
  // });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
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
