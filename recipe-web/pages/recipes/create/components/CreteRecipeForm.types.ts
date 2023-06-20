export interface Ingredient {
  value: string;
  count: number;
  unit: string;
}

export interface Step {
  description: string;
}

export interface Recipe {
  name: string;
  description: string;
  defaultServingCount: number;
  source: string;
  pictureUrl: string;
  ingredients: Ingredient[];
  steps: Step[];
}