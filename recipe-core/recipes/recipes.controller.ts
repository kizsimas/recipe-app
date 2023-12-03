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
    recipeProduct: request.recipeProduct.map((ingredient: any) => ({
      value: ingredient.count,
      productId: ingredient.productId,
      unitId: ingredient.unitId
    })),
    recipeSteps: request.recipeSteps || []
  }

  const savedRecipe = await recipeService.saveRecipe(recipe);
  res.json(savedRecipe);
})

router.delete('/:recipeId', async (req: Request, res: Response<Recipe>) => {
  const recipeId = req.params.recipeId;
  const recipe = await recipeService.deleteRecipe(parseInt(recipeId));

  res.json(recipe);
})

export default router;