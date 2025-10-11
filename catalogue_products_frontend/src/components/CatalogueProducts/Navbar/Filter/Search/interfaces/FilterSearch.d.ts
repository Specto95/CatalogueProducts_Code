export interface FilterSearchProps {
  query: string | number;
  setQuery: React.Dispatch<React.SetStateAction<string | number>>;
  searchPlaceholder?: string;
}
