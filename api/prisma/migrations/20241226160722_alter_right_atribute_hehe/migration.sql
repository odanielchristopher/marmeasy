/*
  Warnings:

  - The `document` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "document",
ADD COLUMN     "document" INTEGER,
ALTER COLUMN "address" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "clients_document_key" ON "clients"("document");
