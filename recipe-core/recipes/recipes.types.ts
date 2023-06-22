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

export type RecipeDto ={ 
    name: string
    description: string
    defaultServingCount: number | null
    source: string | null
    pictureUrl: string | null
    recipeProduct: RecipeProduct[]
}