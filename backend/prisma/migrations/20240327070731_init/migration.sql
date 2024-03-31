/*
  Warnings:

  - You are about to drop the column `foodId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "foodId";
ALTER TABLE "Order" DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "_FoodToOrder" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToOrder_AB_unique" ON "_FoodToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToOrder_B_index" ON "_FoodToOrder"("B");

-- AddForeignKey
ALTER TABLE "_FoodToOrder" ADD CONSTRAINT "_FoodToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToOrder" ADD CONSTRAINT "_FoodToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
