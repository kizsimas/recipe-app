import * as productRepository from './products.repository';
import { Product } from "@prisma/client";

export const getProduct = async (productId: number): Promise<Product | null> => {
    return productRepository.getProduct(productId);
}

export const getAllgetProducts = async (): Promise<Product[]> => {
    return productRepository.getAllProducts();
}

export const savegetProduct= async (product: Product): Promise<Product> => {
    return productRepository.saveProduct(product);
};
