import { Recipe } from '@prisma/client';
import * as recipeRepository from './recipes.repository';
import * as stepsService from '../steps/steps.service';
import * as recipeProductsService from '../recipeProduct/recipeProducts.service';
import { RecipeDto } from './recipes.types';

export const getRecipe = async (recipeId: number): Promise<Recipe | null> => {
    return (await recipeRepository.getRecipe(recipeId)) as Recipe;
}

export const getAllRecipes = async (): Promise<Recipe[]> => {
    return (await recipeRepository.getAllRecipes()).map((recipe) => recipe as Recipe);
}

export const saveRecipe = async (recipe: RecipeDto): Promise<Recipe> => {
    const savedRecipe = await recipeRepository.saveRecipe(recipe);
    return savedRecipe as Recipe;
};

export const deleteRecipe = async (recipeId: number): Promise<Recipe> => {
    const deletedStepsCount = await stepsService.deleteStepsByRecipeId(recipeId);
    const deletedRecipeProductsCount = await recipeProductsService.deleteRecipeProductsByRecipeId(recipeId);

    return (await recipeRepository.deleteRecipe(recipeId)) as Recipe;
}
