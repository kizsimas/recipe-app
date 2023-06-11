import {api} from "./apiService";
import recipes from "../pages/recipes";

const recipesUrl = `/recipes`;

export const fetchRecipes = async () => {
  const {data} = await api.get(recipesUrl);
  return data;
}

export const createRecipe = async (recipe) => {
  const { data } = await api.post(recipesUrl, {
    recipe: {
      ...recipe,
      recipeProduct: [],
    }
  });
  return data;
}