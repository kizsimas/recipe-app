import {
  Ingredient,
  Recipe,
  RecipeDto,
  Step
} from "../components/CreateRecipeForm/CreteRecipeForm.types";

export const mapRecipeToRecipeDto = (recipe: Recipe): RecipeDto => {
  return {
    name: recipe.name,
    description: recipe.description,
    defaultServingCount: recipe.defaultServingCount,
    source: recipe.source,
    pictureUrl: recipe.pictureUrl,
    recipeProduct: recipe.ingredients.map((ingredient: Ingredient) => ({
      unitId: Number.parseInt(ingredient.unit),
      productId: Number.parseInt(ingredient.value),
      count: ingredient.count
    })),
    recipeSteps: recipe.steps.map((step: Step) => ({
      title: 'title',
      description: step.description
    })),
  };
}