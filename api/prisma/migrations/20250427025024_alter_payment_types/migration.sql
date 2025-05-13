/*
  Warnings:

  - The values [CREDIT_CARD,DEBIT_CARD] on the enum `payment_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "payment_type_new" AS ENUM ('CREDIT', 'DEBIT', 'CASH');
ALTER TABLE "payments" ALTER COLUMN "type" TYPE "payment_type_new" USING ("type"::text::"payment_type_new");
ALTER TYPE "payment_type" RENAME TO "payment_type_old";
ALTER TYPE "payment_type_new" RENAME TO "payment_type";
DROP TYPE "payment_type_old";
COMMIT;
