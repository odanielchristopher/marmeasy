/*
  Warnings:

  - You are about to drop the `ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingredients_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "order_type" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER');

-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_products" DROP CONSTRAINT "ingredients_products_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_products" DROP CONSTRAINT "ingredients_products_product_id_fkey";

-- DropTable
DROP TABLE "ingredients";

-- DropTable
DROP TABLE "ingredients_products";

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "customer_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "order_type" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_items_product_id_order_id_key" ON "order_items"("product_id", "order_id");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
