import * as recipeRepository from './recipes.repository';
import { Recipe, RecipeProduct } from "@prisma/client";
import { RecipeDto } from './recipes.types';

export const getRecipe = async (recipeId: number): Promise<RecipeDto | null> => {
    return (await recipeRepository.getRecipe(recipeId)) as RecipeDto;
}

export const getAllRecipes = async (): Promise<RecipeDto[]> => {
    return (await recipeRepository.getAllRecipes()).map((recipe) => recipe as RecipeDto);
}

export const saveRecipe = async (recipe: RecipeDto): Promise<RecipeDto> => {
    const savedRecipe = await recipeRepository.saveRecipe(recipe);
    return savedRecipe as RecipeDto;
};
