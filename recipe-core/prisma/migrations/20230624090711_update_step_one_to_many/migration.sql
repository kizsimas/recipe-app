/*
  Warnings:

  - You are about to drop the `RecipeStep` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recipeId` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RecipeStep" DROP CONSTRAINT "RecipeStep_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeStep" DROP CONSTRAINT "RecipeStep_stepId_fkey";

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "recipeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "RecipeStep";

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
