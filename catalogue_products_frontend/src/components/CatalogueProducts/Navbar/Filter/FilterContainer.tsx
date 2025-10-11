import { Filter } from "./Filter";
import { FilterSearch } from "./Search/FilterSearch";
import type { FilterContainerProps } from "./interfaces/FilterContainer";

import styles from "./Filter.module.css";

export function FilterContainer({
  arrowClicked,
  setArrowClicked,
  setQueryName,
  setQueryPriceRange,
  queryName,
  queryPriceRange,
  minPrice,
  maxPrice,
}: FilterContainerProps) {
  return (
    <Filter
      arrowClicked={arrowClicked}
      setArrowClicked={setArrowClicked}
      customDetailsName="Filtros"
      hideDetailsName="Ocultar filtros"
      setQueryName={setQueryName}
      setQueryPriceRange={setQueryPriceRange}
    >
      <FilterSearch
        query={queryName}
        setQuery={
          setQueryName as React.Dispatch<React.SetStateAction<string | number>>
        }
        searchPlaceholder="Buscar por nombre:"
      />

      <label>Precio mínimo: {queryPriceRange[0]}</label>
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={queryPriceRange[0]}
        onChange={(e) =>
          setQueryPriceRange([Number(e.target.value), queryPriceRange[1]])
        }
        className={styles.filter__inputRange}
      />

      <label>Precio máximo: {queryPriceRange[1]}</label>
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={queryPriceRange[1]}
        onChange={(e) =>
          setQueryPriceRange([queryPriceRange[0], Number(e.target.value)])
        }
        className={styles.filter__inputRange}
      />
    </Filter>
  );
}
