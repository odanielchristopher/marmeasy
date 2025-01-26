/*
  Warnings:

  - A unique constraint covering the columns `[user_id,document]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "clients_document_key";

-- CreateIndex
CREATE UNIQUE INDEX "clients_user_id_document_key" ON "clients"("user_id", "document");
