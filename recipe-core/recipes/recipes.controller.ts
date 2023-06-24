import express, { Request, Response } from 'express';
import { Recipe } from "@prisma/client";
import * as recipeService from './recipes.service';
import { CreateRecipeRequest, GetRecipeResponse, RecipeDto } from './recipes.types';
const router = express.Router();

router.get('/:recipeId', async (req: Request, res: Response<GetRecipeResponse>) => {
  const recipeId = req.params.recipeId;
  const recipe = await recipeService.getRecipe(parseInt(recipeId)); 
  res.json({ recipe });
})

router.get('/', async (req: Request, res: Response<Recipe[]>) => {
  const recipe = await recipeService.getAllRecipes(); 
  res.json(recipe);
})

router.post('/', async (req: Request<CreateRecipeRequest>, res: Response) => {
  const request = req.body.recipe;
  const recipe: RecipeDto = {
    name: request.name,
    description: request.description,
    defaultServingCount: request.defaultServingCount,
    source: request.source,
    pictureUrl: request.pictureUrl,
    recipeProduct: request.ingredients.map((ingredient: any) => ({
      value: ingredient.count,
      productId: 1, // hardcoded for now
      unitId: 1 // hardcoded for now
    })),
    recipeSteps: request.steps || []
  }

  const savedRecipe = await recipeService.saveRecipe(recipe);
  res.json(savedRecipe);
})

export default router;