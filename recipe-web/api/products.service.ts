import { Product, ProductDto } from "../types/product.types";
import {api} from "./apiService";

const productsUrl = `/products`;

export const fetchProducts = async (): Promise<Product[]> => {
  const {data} = await api.get<Product[]>(productsUrl);
  return data;
}

export const createProduct = async (productName: string): Promise<Product> => {
  var {data} = await api.post<Product>(productsUrl,  { productName });
  return data;
}
