import { Product } from "../types/product.types";
import {api} from "./apiService";

const productsUrl = `/products`;

export const fetchProducts = async (): Promise<Product[]> => {
  const {data} = await api.get<Product[]>(productsUrl);
  return data;
}
