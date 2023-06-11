import { PrismaClient, Recipe } from "@prisma/client";
import { RecipeDto } from "./recipes.types";

const prisma = new PrismaClient();

export const getRecipe = async (recipeId: number): Promise<RecipeDto| null> => {
    const recipe = await prisma.recipe.findFirst({
        where: {
            id: recipeId
        },
        include: {
            recipeProduct: true
        }
    });
    return recipe;
}

export const getAllRecipes = async (): Promise<Recipe[]> => {
    const recipes = await prisma.recipe.findMany({
        include: {
            recipeProduct: true
        }
    });
    return recipes;
}

export const saveRecipe = async (recipe: RecipeDto): Promise<Recipe> => {
    const created = await prisma.recipe.create({
        data: {
            ...recipe,
            recipeProduct: {
                create: [...recipe.recipeProduct]
            }
        }

    });
    return created;
}