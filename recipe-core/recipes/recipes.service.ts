import * as recipeRepository from './recipes.repository';
import { Recipe } from "@prisma/client";

export const getRecipe = async (recipeId: number): Promise<Recipe | null> => {
    return recipeRepository.getRecipe(recipeId);
}

export const getAllRecipes = async (): Promise<Recipe[]> => {
    return recipeRepository.getAllRecipes();
}

export const saveRecipe = async (recipe: Recipe): Promise<Recipe> => {
    return recipeRepository.saveRecipe(recipe);
};
