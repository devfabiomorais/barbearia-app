/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `enterprise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "enterprise_email_key" ON "enterprise"("email");
