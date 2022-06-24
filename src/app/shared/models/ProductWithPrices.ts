import { Price } from "./Price";

export interface ProductWithPrices {
  id?: number;
  name: string;
  description: string;
  type: string;
  image: string;
  prices: Price[];
}
