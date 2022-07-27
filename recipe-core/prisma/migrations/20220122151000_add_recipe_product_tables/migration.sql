-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "defaultServingCount" INTEGER,
ADD COLUMN     "description" VARCHAR(255) NOT NULL DEFAULT E'',
ADD COLUMN     "pictureUrl" TEXT,
ADD COLUMN     "source" TEXT;

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fibers" DECIMAL(65,30),
    "fats" DECIMAL(65,30),
    "carbs" DECIMAL(65,30),
    "proteins" DECIMAL(65,30),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeProduct" (
    "productId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "RecipeProduct_pkey" PRIMARY KEY ("productId","recipeId")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "measurement" TEXT NOT NULL,
    "unitCategory" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecipeProduct" ADD CONSTRAINT "RecipeProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeProduct" ADD CONSTRAINT "RecipeProduct_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeProduct" ADD CONSTRAINT "RecipeProduct_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
