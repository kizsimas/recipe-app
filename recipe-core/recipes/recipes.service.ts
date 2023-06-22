import { Recipe } from '@prisma/client';
import * as recipeRepository from './recipes.repository';
import { RecipeDto } from './recipes.types';

export const getRecipe = async (recipeId: number): Promise<RecipeDto | null> => {
    return (await recipeRepository.getRecipe(recipeId)) as RecipeDto;
}

export const getAllRecipes = async (): Promise<Recipe[]> => {
    return (await recipeRepository.getAllRecipes()).map((recipe) => recipe as Recipe);
}

export const saveRecipe = async (recipe: RecipeDto): Promise<Recipe> => {
    const savedRecipe = await recipeRepository.saveRecipe(recipe);
    return savedRecipe as Recipe;
};
