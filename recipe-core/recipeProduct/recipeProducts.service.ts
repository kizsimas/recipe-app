import * as recipeProductsRepository from './recipeProducts.repository';
import { Product } from "@prisma/client";

export const deleteRecipeProductsByRecipeId = async (recipeId: number): Promise<number> => {
    return recipeProductsRepository.deleteRecipeProductByRecipeId(recipeId);
}