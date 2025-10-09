import { MdAdd } from "react-icons/md";
import styles from "./CreateProductCardView.module.css";
import { useProductsProvider } from "../../../../hooks/useProductsProvider";

export function CreateProductCardView() {
  const {setIsCreating} = useProductsProvider();
  return (
    <div className={styles.CPW__createCard}>
      <div className={styles.CPW__addContainer}>
        <MdAdd
          size={48}
          className={styles.CPW__addIcon}
          onClick={() => setIsCreating && setIsCreating(true)}
        />
        <p className={styles.CPW__createText}>Agregar Producto</p>
      </div>
    </div>
  );
}
