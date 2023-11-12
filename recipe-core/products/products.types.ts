import { Product } from "@prisma/client";

export type ProductDto = {
    name: string
    fibers?: number,
    fats?: number,
    carbs?: number,
    proteins?: number
}

export interface CreateProductRequest {
    productName: string
}