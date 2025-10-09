import type { Product } from "../../../interfaces/api/Products";

export interface ListProductCardDetailsProps {
  product: Product;
  setIsUpdatingProduct: React.Dispatch<React.SetStateAction<boolean>>;
}
