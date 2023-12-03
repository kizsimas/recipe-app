import { PrismaClient, RecipeProduct } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteRecipeProductByRecipeId = async (recipeId: number): Promise<number> => {
    const { count } = await prisma.recipeProduct.deleteMany({
        where: {
            recipeId: recipeId
        },
    });
    return count;
}