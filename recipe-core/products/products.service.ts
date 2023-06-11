import * as productRepository from './products.repository';
import { Product } from "@prisma/client";
import { ProductDto } from './products.types';

export const getProduct = async (productId: number): Promise<Product | null> => {
    return productRepository.getProduct(productId);
}

export const getAllgetProducts = async (): Promise<Product[]> => {
    return productRepository.getAllProducts();
}

export const saveProduct= async (product: ProductDto): Promise<Product> => {
    return productRepository.saveProduct(product);
};
