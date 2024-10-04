import { Ingredient, Recipe } from "../components/CreateRecipeForm/CreteRecipeForm.types"
import { Product } from "./product.types"

export type Plan = 
{
    id: number | null;
    name: string;
    planGroups: PlanGroup[];
    products: ProductSelection[]
}

export type PlanGroup = 
{
    id: string;
    name: string;
    planGroupMeals: PlanGroupMeal[];
}

export type PlanGroupMeal = {
    name: string;
    recipeId: number | null;
}

export type ProductSelection = {
    productId: number;
    unitId: number;
    count: number;
}
