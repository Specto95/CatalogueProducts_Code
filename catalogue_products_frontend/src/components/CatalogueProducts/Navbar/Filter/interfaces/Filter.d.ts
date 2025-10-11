export interface FilterProps {
  arrowClicked: boolean;
  setArrowClicked: (value: boolean) => void;
  children: React.ReactNode;
  customDetailsName?: string;
  hideDetailsName?: string;
  setQueryName: React.Dispatch<React.SetStateAction<string>>;
  setQueryPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}
