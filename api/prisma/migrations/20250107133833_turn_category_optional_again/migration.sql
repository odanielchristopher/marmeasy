-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_product_category_id_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "product_category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
