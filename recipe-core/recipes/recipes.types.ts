import { Recipe, RecipeProduct } from "@prisma/client";

export interface CreateRecipeRequest {
    recipe: RecipeDto
}

export interface CreateRecipeResponse {
    reicpe: RecipeDto
}

export interface GetRecipeResponse {
    recipe: RecipeDto | null;
}

export type RecipeDto = Recipe & { recipeProduct: RecipeProduct[]}