/*
  Warnings:

  - The `type` column on the `expenses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "customer_type" AS ENUM ('INDIVIDUAL', 'BUSINESS');

-- CreateEnum
CREATE TYPE "payment_type" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'CASH');

-- CreateEnum
CREATE TYPE "expense_type" AS ENUM ('TAXES', 'DELIVERY', 'EQUIPMENTS', 'EMPLOYEES', 'UTENSILS', 'MEATS', 'GARRISONS', 'OTHERS');

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "type",
ADD COLUMN     "type" "expense_type" DEFAULT 'OTHERS';

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "type",
ADD COLUMN     "type" "payment_type" NOT NULL;

-- DropEnum
DROP TYPE "ExpenseType";

-- DropEnum
DROP TYPE "PaymentType";

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" "customer_type" NOT NULL,
    "color" TEXT NOT NULL,
    "phone" TEXT,
    "balance" DOUBLE PRECISION NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
