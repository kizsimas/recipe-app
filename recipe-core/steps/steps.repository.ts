import { PrismaClient, Step } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteStepsByRecipeId = async (recipeId: number): Promise<number> => {
    const { count } = await prisma.step.deleteMany({
        where: {
            recipeId: recipeId
        },
    });
    return count;
}