import { useFormik } from "formik";
import { useProductsProvider } from "../../../../hooks/useProductsProvider";
import styles from "../../CatalogueProducts.module.css";
import { productSchema } from "./formProps/schema/productSchema";

// import { CREATE_PRODUCT } from "../../../../api/mutation/createProduct";
// import { useMutation } from "@apollo/client/react";
import { useSessionProvider } from "../../../../hooks/useSessionProvider";
import { UserRole } from "../../../../context/types/User";
import { PRODUCT_API } from "../../../../context/helpers/api";

export function CreateProductCard() {
  const { setProducts, setIsCreating, productsLength } = useProductsProvider();
  const { user, token } = useSessionProvider();

  const handleCreate = async (values: {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
  }) => {
    const data = {
      id: values.id,
      title: values.title,
      description: values.description,
      price: values.price,
      category: values.category,
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    };
    await fetch(PRODUCT_API.CREATE_PRODUCT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(data),
    });

    setProducts((prev) => [
      {
        ...data,
      },
      ...prev,
    ]);
  };

  const formik = useFormik({
    initialValues: {
      id: productsLength.current + 1,
      title: "",
      description: "",
      price: 0,
      category: "",
    },
    validationSchema: productSchema,
    onSubmit: async (values, { resetForm }) => {
      if (user.role !== UserRole.ADMIN) return;
      try {
        handleCreate(values);
      } catch (error) {
        console.error(error);
        setIsCreating!(false);
      }
      resetForm();
      alert("Producto creado con éxito!");
      setIsCreating!(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.CPW__card}>
      <div className={styles.CPW__info}>
        <input
          type="text"
          name="title"
          placeholder="Título:"
          className={
            formik.touched.title && formik.errors.title
              ? styles.CPW__inputError
              : formik.touched.title && !formik.errors.title
              ? styles.CPW__inputSuccess
              : styles.CPW__input
          }
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <input
          type="text"
          name="description"
          placeholder="Descripción:"
          className={
            formik.touched.description && formik.errors.description
              ? styles.CPW__inputError
              : formik.touched.description && !formik.errors.description
              ? styles.CPW__inputSuccess
              : styles.CPW__input
          }
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <div className={styles.CPW__priceContainer}>
          <input
            type="number"
            name="price"
            placeholder="Precio:"
            className={
              formik.touched.price && formik.errors.price
                ? styles.CPW__inputError
                : formik.touched.price && !formik.errors.price
                ? styles.CPW__inputSuccess
                : styles.CPW__input
            }
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <select
            name="category"
            className={
              formik.touched.category && formik.errors.category
                ? styles.CPW__inputError
                : formik.touched.category && !formik.errors.category
                ? styles.CPW__inputSuccess
                : styles.CPW__input
            }
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>
              Selecciona una categoría:
            </option>
            <option value="beauty">beauty</option>
            <option value="fragances">fragances</option>
            <option value="furniture">furniture</option>
            <option value="groceries">groceries</option>
          </select>
        </div>
      </div>

      <div className={styles.CPW__btnContainer}>
        <button type="submit" className={styles.CPW__submitBtn}>
          Crear producto
        </button>

        <button
          type="button"
          className={styles.CPW__cancelBtn}
          onClick={() => {
            setIsCreating!(false);
            formik.resetForm();
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
