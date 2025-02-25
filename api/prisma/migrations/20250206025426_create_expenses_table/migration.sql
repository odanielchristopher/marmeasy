-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('TAXES', 'DELIVERY', 'EQUIPMENTS', 'EMPLOYEES', 'UTENSILS', 'MEATS', 'GARRISONS', 'OTHERS');

-- CreateTable
CREATE TABLE "expenses" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "ExpenseType" DEFAULT 'OTHERS',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
