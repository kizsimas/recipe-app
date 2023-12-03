import * as stepsRepository from './steps.repository';
import { Product } from "@prisma/client";

export const deleteStepsByRecipeId = async (recipeId: number): Promise<number> => {
    return stepsRepository.deleteStepsByRecipeId(recipeId);
}