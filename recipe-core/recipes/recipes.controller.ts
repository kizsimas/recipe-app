import express, { Request, Response } from 'express';
import { Recipe } from './recipes.types';
import * as recipeService from './recipes.service';
const router = express.Router();

router.get('/', async (req: Request<string>, res: Response<Recipe>) => {
  const recipeId = req.body;
  const recipe = await recipeService.getRecipe(recipeId); 
  res.json(recipe);
})

router.post('/', async (req: Request<Recipe>, res: Response) => {
  const recipe = req.body as Recipe;
  const savedRecipe = await recipeService.saveRecipe(recipe);
  res.json(savedRecipe);
})

export default router;