import { PrismaClient, Recipe, Step } from "@prisma/client";
import { RecipeDto, StepDto } from "./recipes.types";

const prisma = new PrismaClient();

export const getRecipe = async (recipeId: number): Promise<Recipe| null> => {
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
            },
            recipeSteps: {
                create: recipe.recipeSteps
            }
        },
    });
    return created;
}

export const deleteRecipe = async (recipeId: number): Promise<Recipe> => {
    const recipe = await prisma.recipe.delete({
        where: {
            id: recipeId
        },
    });
    return recipe;
}