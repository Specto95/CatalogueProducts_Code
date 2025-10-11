import { useMemo } from "react";

export type FieldQuery<T> = {
  field: keyof T;
  query: string | number | [number, number];
};

export function MultiFilter<T>(
  items: T[] | undefined,
  filters: FieldQuery<T>[]
) {
  const filteredItems = useMemo(() => {
    if (!items) return [];

    const activeFilters = filters.filter((f) => {
      if (Array.isArray(f.query)) {
        return f.query[0] !== f.query[1];
      }
      if (typeof f.query === "number") {
        return f.query !== 0;
      }
      return f.query.toString().trim() !== "";
    });

    if (activeFilters.length === 0) return items;

    return items.filter((item) =>
      activeFilters.every(({ field, query }) => {
        const value = item[field];

        if (Array.isArray(query) && typeof value === "number") {
          const [min, max] = query;
          return value >= min && value <= max;
        }

        if (typeof value === "number" && typeof query === "number") {
          return value === query;
        }

        if (typeof value === "string" && typeof query === "string") {
          return value.toLowerCase().includes(query.toLowerCase());
        }

        return true;
      })
    );
  }, [items, filters]);

  return { filteredItems };
}
