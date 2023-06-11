import express, { Request, Response } from 'express';
import { Recipe } from "@prisma/client";
import * as recipeService from './recipes.service';
import { GetRecipeRequest, GetRecipeResponse } from './recipes.types';
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
  const recipe = req.body as CreateRecipeRequest;
  const savedRecipe = await recipeService.saveRecipe(recipe);
  res.json(savedRecipe);
})

export default router;