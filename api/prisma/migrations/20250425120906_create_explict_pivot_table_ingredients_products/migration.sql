/*
  Warnings:

  - You are about to drop the `_product_ingredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_product_ingredient" DROP CONSTRAINT "_product_ingredient_A_fkey";

-- DropForeignKey
ALTER TABLE "_product_ingredient" DROP CONSTRAINT "_product_ingredient_B_fkey";

-- DropTable
DROP TABLE "_product_ingredient";

-- CreateTable
CREATE TABLE "ingredients_products" (
    "ingredient_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,

    CONSTRAINT "ingredients_products_pkey" PRIMARY KEY ("ingredient_id","product_id")
);

-- AddForeignKey
ALTER TABLE "ingredients_products" ADD CONSTRAINT "ingredients_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_products" ADD CONSTRAINT "ingredients_products_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
