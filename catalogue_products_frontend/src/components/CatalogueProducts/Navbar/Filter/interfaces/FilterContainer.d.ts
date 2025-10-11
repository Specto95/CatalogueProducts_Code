export interface FilterContainerProps {
  arrowClicked: boolean;
  setArrowClicked: React.Dispatch<React.SetStateAction<boolean>>;
  customDetailsName?: string;
  hideDetailsName?: string;
  setQueryName: React.Dispatch<React.SetStateAction<string>>;
  setQueryPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  minPrice: number;
  maxPrice: number;
  queryName: string;
  queryPriceRange: [number, number];
}
