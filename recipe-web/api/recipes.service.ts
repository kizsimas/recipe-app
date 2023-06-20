import {api} from "./apiService";
import {Recipe} from "../pages/recipes/create/components/CreteRecipeForm.types";

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