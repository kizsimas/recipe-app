import * as recipeRepository from './recipes.repository';
import { Recipe } from './recipes.types';

export const getRecipe = async (recipeId: string): Promise<Recipe> => {
    return recipeRepository.getRecipe(recipeId);
}

export const saveRecipe = async (recipe: Recipe): Promise<Recipe> => {
    return recipeRepository.saveRecipe(recipe);
};
