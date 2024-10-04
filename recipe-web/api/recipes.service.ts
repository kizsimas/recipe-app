import { RecipeDto, RecipeForm} from "../components/CreateRecipeForm/CreteRecipeForm.types";
import { Recipe } from "../types/recipe.types";
import {api} from "./apiService";
import {mapRecipeToRecipeDto} from "./recipes.utils";

const recipesUrl = `/recipes`;

export const fetchRecipes = async () => {
  const {data} = await api.get(recipesUrl);
  return data;
}

export const fetchRecipeById = async (id: string) : Promise<Recipe> => {
  const {data} = await api.get<Recipe>(recipesUrl + "/" + id);
  return data;
}

export const createRecipe = async (recipe: RecipeForm) => {
  const recipeDto: RecipeDto = mapRecipeToRecipeDto(recipe);
  const { data } = await api.post(recipesUrl, {
    recipe: {
      ...recipeDto
    }
  });
  return data;
}

export const deleteRecipe = async (id: number) => {
  const { data } = await api.delete(recipesUrl + '/' + id);
  return data;
}