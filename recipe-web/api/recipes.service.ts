import { Recipe } from "../components/CreateRecipeForm/CreteRecipeForm.types";
import {api} from "./apiService";

const recipesUrl = `/recipes`;

export const fetchRecipes = async () => {
  const {data} = await api.get(recipesUrl);
  return data;
}

export const createRecipe = async (recipe: Recipe) => {
  const { data } = await api.post(recipesUrl, {
    recipe: {
      ...recipe,
      recipeProduct: [],
    }
  });
  return data;
}