import styles from "./FilterSearch.module.css";

import { CiSearch as Search } from "react-icons/ci";
import type { FilterSearchProps } from "./interfaces/FilterSearch";

export function FilterSearch({
  query,
  setQuery,
  searchPlaceholder = "Buscar",
}: FilterSearchProps) {
  return (
    <div className={styles.filter__container}>
      <input
        onChange={(e) => {
          if (typeof query === "number") {
            const value = e.target.value;
            const numberValue = value === "" ? 0 : Number(value);
            if (!isNaN(numberValue)) {
              setQuery(numberValue as React.SetStateAction<string | number>);
            }
            return;
          }
          setQuery(e.target.value);
        }}
        type={typeof query === "number" ? "number" : "text"}
        value={query}
        placeholder={searchPlaceholder}
        className={styles.filter__input}
      />
      <Search className={styles.filter__searchWhiteIcon} />
    </div>
  );
}
