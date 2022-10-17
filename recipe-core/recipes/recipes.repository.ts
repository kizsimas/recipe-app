import { Recipe } from "./recipes.types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRecipe = async (recipeId: string): Promise<Recipe> => {

    const recipes = await prisma.recipe.findMany();
    const recipe: Recipe = { id: recipeId }; 
    return new Promise((resolve, reject) => resolve(recipe));
}

export const saveRecipe = async (recipe: Recipe): Promise<Recipe> => {
    await prisma.recipe.create({
        data: {
            name: 'Cool recipe'
        }
    });
    return new Promise((resolve, reject) => resolve(recipe));
}