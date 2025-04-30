/*
  Warnings:

  - You are about to drop the `assoc_permission_groups_functionality` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enterprise_user_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "assoc_permission_groups_functionality" DROP CONSTRAINT "assoc_permission_groups_functionality_enterprise_id_fkey";

-- DropForeignKey
ALTER TABLE "assoc_permission_groups_functionality" DROP CONSTRAINT "assoc_permission_groups_functionality_functionality_id_fkey";

-- DropForeignKey
ALTER TABLE "assoc_permission_groups_functionality" DROP CONSTRAINT "assoc_permission_groups_functionality_permission_group_id_fkey";

-- DropForeignKey
ALTER TABLE "enterprise_user_permissions" DROP CONSTRAINT "enterprise_user_permissions_enterprise_user_id_fkey";

-- DropForeignKey
ALTER TABLE "enterprise_user_permissions" DROP CONSTRAINT "enterprise_user_permissions_user_permission_id_fkey";

-- DropTable
DROP TABLE "assoc_permission_groups_functionality";

-- DropTable
DROP TABLE "enterprise_user_permissions";

-- DropTable
DROP TABLE "user_permissions";

-- CreateTable
CREATE TABLE "permission_groups" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "permission_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enterprise_users_permission_groups" (
    "id" SERIAL NOT NULL,
    "user_permission_id" INTEGER NOT NULL,
    "enterprise_user_id" INTEGER NOT NULL,

    CONSTRAINT "enterprise_users_permission_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_group_functionality" (
    "id" SERIAL NOT NULL,
    "permission_group_id" INTEGER NOT NULL,
    "functionality_id" INTEGER NOT NULL,
    "enterprise_id" INTEGER NOT NULL,

    CONSTRAINT "permission_group_functionality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "permission_groups_id_idx" ON "permission_groups"("id");

-- CreateIndex
CREATE INDEX "enterprise_users_permission_groups_id_idx" ON "enterprise_users_permission_groups"("id");

-- CreateIndex
CREATE INDEX "enterprise_users_permission_groups_user_permission_id_idx" ON "enterprise_users_permission_groups"("user_permission_id");

-- CreateIndex
CREATE INDEX "enterprise_users_permission_groups_enterprise_user_id_idx" ON "enterprise_users_permission_groups"("enterprise_user_id");

-- AddForeignKey
ALTER TABLE "enterprise_users_permission_groups" ADD CONSTRAINT "enterprise_users_permission_groups_user_permission_id_fkey" FOREIGN KEY ("user_permission_id") REFERENCES "permission_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enterprise_users_permission_groups" ADD CONSTRAINT "enterprise_users_permission_groups_enterprise_user_id_fkey" FOREIGN KEY ("enterprise_user_id") REFERENCES "enterprise_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission_group_functionality" ADD CONSTRAINT "permission_group_functionality_permission_group_id_fkey" FOREIGN KEY ("permission_group_id") REFERENCES "permission_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission_group_functionality" ADD CONSTRAINT "permission_group_functionality_functionality_id_fkey" FOREIGN KEY ("functionality_id") REFERENCES "functionality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission_group_functionality" ADD CONSTRAINT "permission_group_functionality_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
