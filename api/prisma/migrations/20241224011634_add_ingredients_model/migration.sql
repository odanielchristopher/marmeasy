-- AlterTable
ALTER TABLE "products" ADD COLUMN     "ingredientId" UUID;

-- CreateTable
CREATE TABLE "ingredient" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_product_ingredient" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_product_ingredient_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_product_ingredient_B_index" ON "_product_ingredient"("B");

-- AddForeignKey
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_product_ingredient" ADD CONSTRAINT "_product_ingredient_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_product_ingredient" ADD CONSTRAINT "_product_ingredient_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
