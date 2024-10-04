import express, { Request, Response } from 'express';
import { Recipe } from "@prisma/client";
import * as recipeService from './recipes.service';
import { CreateRecipeRequest, GetRecipeResponse, RecipeDto } from './recipes.types';
const router = express.Router();

router.get('/:recipeId', async (req: Request, res: Response<Recipe>) => {
  const recipeId = req.params.recipeId;
  const recipe = await recipeService.getRecipe(parseInt(recipeId)); 
  res.json(recipe as Recipe);
})

router.get('/', async (req: Request, res: Response<Recipe[]>) => {
  const recipe = await recipeService.getAllRecipes(); 
  res.json(recipe);
})

router.post('/', async (req: Request<CreateRecipeRequest>, res: Response) => {
  const request = req.body.recipe;
  const savedRecipe = await recipeService.saveRecipe(request);
  res.json(savedRecipe);
})

router.delete('/:recipeId', async (req: Request, res: Response<Recipe>) => {
  const recipeId = req.params.recipeId;
  const recipe = await recipeService.deleteRecipe(parseInt(recipeId));

  res.json(recipe);
})

/**
 * @swagger
 * /recipes/convert:
 *   post:
 *     summary: Returns a greeting message
 *     responses:
 *       200:
 *         description: A greeting message
 */
router.post('/convert', async (req: Request, res: Response) => {
  const convertResult = await recipeService.convertRecipe();
  res.json(convertResult);
})

export default router;