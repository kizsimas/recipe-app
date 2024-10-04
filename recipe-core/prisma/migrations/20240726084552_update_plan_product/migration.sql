/*
  Warnings:

  - The primary key for the `PlanProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PlanProduct` table. All the data in the column will be lost.
  - Added the required column `productId` to the `PlanProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitId` to the `PlanProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `PlanProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlanProduct" DROP CONSTRAINT "PlanProduct_pkey",
DROP COLUMN "id",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "unitId" INTEGER NOT NULL,
ADD COLUMN     "value" DECIMAL(65,30) NOT NULL,
ADD CONSTRAINT "PlanProduct_pkey" PRIMARY KEY ("productId", "planId");

-- AddForeignKey
ALTER TABLE "PlanProduct" ADD CONSTRAINT "PlanProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanProduct" ADD CONSTRAINT "PlanProduct_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
