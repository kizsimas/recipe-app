import { PrismaClient, Recipe } from "@prisma/client";

const prisma = new PrismaClient();

export const getRecipe = async (recipeId: number): Promise<Recipe | null> => {
    const recipe = await prisma.recipe.findFirst({
        where: {
            id: recipeId
        }
    });
    return recipe;
}

export const getAllRecipes = async (): Promise<Recipe[]> => {
    const recipes = await prisma.recipe.findMany();
    return recipes;
}

export const saveRecipe = async (recipe: Recipe): Promise<Recipe> => {
    const created = await prisma.recipe.create({
        data: recipe
    });
    return created;
}