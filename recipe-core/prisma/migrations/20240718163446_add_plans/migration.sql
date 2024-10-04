-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanProduct" (
    "id" SERIAL NOT NULL,
    "planId" INTEGER NOT NULL,

    CONSTRAINT "PlanProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "planId" INTEGER NOT NULL,

    CONSTRAINT "PlanGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanGroupMeal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "planGroupId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "PlanGroupMeal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlanProduct" ADD CONSTRAINT "PlanProduct_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanGroup" ADD CONSTRAINT "PlanGroup_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanGroupMeal" ADD CONSTRAINT "PlanGroupMeal_planGroupId_fkey" FOREIGN KEY ("planGroupId") REFERENCES "PlanGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanGroupMeal" ADD CONSTRAINT "PlanGroupMeal_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
