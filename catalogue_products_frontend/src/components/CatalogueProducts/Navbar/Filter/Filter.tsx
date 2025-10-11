import styles from "./Filter.module.css";
import type { FilterProps } from "./interfaces/Filter";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";

export function Filter({
  arrowClicked,
  setArrowClicked,
  children,
  customDetailsName = "Mas detalles",
  hideDetailsName = "Regresar",
  setQueryName,
  setQueryPriceRange,
}: FilterProps) {
  return (
    <>
      <div className={styles.filter__container}>
        <h3 className={styles.filter__text}>
          {arrowClicked ? hideDetailsName : customDetailsName}
        </h3>
        <div
          className={styles.filter__click}
          onClick={() => {
            setQueryName("");
            setQueryPriceRange([0, 0]);
            setArrowClicked(!arrowClicked);
          }}
        >
          <ArrowDown
            className={`${styles.filter__img} ${
              arrowClicked ? "rotateArrow180Deg" : ""
            }`}
          />
        </div>
      </div>
      <div
        className={`${styles.filter__children} ${
          arrowClicked ? styles.isVisible : ""
        }`}
      >
        {children}
      </div>
    </>
  );
}
