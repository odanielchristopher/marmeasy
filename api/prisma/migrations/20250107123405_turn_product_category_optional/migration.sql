/*
  Warnings:

  - You are about to drop the column `ingredientId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `ingredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_product_ingredient" DROP CONSTRAINT "_product_ingredient_A_fkey";

-- DropForeignKey
ALTER TABLE "ingredient" DROP CONSTRAINT "ingredient_user_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "ingredientId";

-- DropTable
DROP TABLE "ingredient";

-- CreateTable
CREATE TABLE "ingredients" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_product_ingredient" ADD CONSTRAINT "_product_ingredient_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
