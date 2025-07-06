/*
  Warnings:

  - You are about to drop the column `client_id` on the `payments` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "client_id",
ADD COLUMN     "customer_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
