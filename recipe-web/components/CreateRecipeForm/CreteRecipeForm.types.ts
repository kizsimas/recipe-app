export interface Ingredient {
  value: string;
  count: number;
  unit: string;
}

export interface Step {
  description: string;
}

export interface RecipeForm {
  id: number;
  name: string;
  description: string;
  defaultServingCount: number;
  source: string;
  pictureUrl: string;
  ingredients: Ingredient[];
  steps: Step[];
}

export interface RecipeDto {
  name: string;
  description: string;
  defaultServingCount: number;
  source: string;
  pictureUrl: string;
  recipeProduct: RecipeProduct[];
  recipeSteps: StepDto[];
}

interface RecipeProduct {
  productId: number;
  unitId: number;
  value: number;
}

interface StepDto {
  title: string;
  description: string;
}