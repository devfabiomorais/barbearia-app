/*
  Warnings:

  - Added the required column `state` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "enterprise" DROP CONSTRAINT "enterprise_address_id_fkey";

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "state" TEXT NOT NULL,
ALTER COLUMN "complement" DROP NOT NULL;

-- AlterTable
ALTER TABLE "enterprise" ALTER COLUMN "address_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "enterprise" ADD CONSTRAINT "enterprise_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
