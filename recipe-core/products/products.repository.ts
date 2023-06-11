import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export const getProduct = async (productId: number): Promise<Product | null> => {
    const product = await prisma.product.findFirst({
        where: {
            id: productId
        }
    });
    return product;
}

export const getAllProducts = async (): Promise<Product[]> => {
    const products = await prisma.product.findMany();
    return products;
}

export const saveProduct = async (product: Product): Promise<Product> => {
    const created = await prisma.product.create({
        data: product
    });
    return created;
}