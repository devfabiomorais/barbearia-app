-- CreateTable
CREATE TABLE "enterprise_users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "document" TEXT,
    "phone" TEXT,
    "active" BOOLEAN NOT NULL,
    "last_login" TIMESTAMP(3),
    "profile_logo" BYTEA,
    "address_id" INTEGER,
    "enterprise_id" INTEGER NOT NULL,

    CONSTRAINT "enterprise_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_permissions" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enterprise_user_permissions" (
    "id" SERIAL NOT NULL,
    "user_permission_id" INTEGER NOT NULL,
    "enterprise_user_id" INTEGER NOT NULL,

    CONSTRAINT "enterprise_user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "functionality" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "module_id" INTEGER NOT NULL,

    CONSTRAINT "functionality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assoc_permission_groups_functionality" (
    "id" SERIAL NOT NULL,
    "permission_group_id" INTEGER NOT NULL,
    "functionality_id" INTEGER NOT NULL,
    "enterprise_id" INTEGER NOT NULL,

    CONSTRAINT "assoc_permission_groups_functionality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "enterprise_users_email_key" ON "enterprise_users"("email");

-- CreateIndex
CREATE INDEX "enterprise_users_id_idx" ON "enterprise_users"("id");

-- CreateIndex
CREATE INDEX "enterprise_users_email_idx" ON "enterprise_users"("email");

-- CreateIndex
CREATE INDEX "user_permissions_id_idx" ON "user_permissions"("id");

-- CreateIndex
CREATE INDEX "enterprise_user_permissions_id_idx" ON "enterprise_user_permissions"("id");

-- CreateIndex
CREATE INDEX "enterprise_user_permissions_user_permission_id_idx" ON "enterprise_user_permissions"("user_permission_id");

-- CreateIndex
CREATE INDEX "enterprise_user_permissions_enterprise_user_id_idx" ON "enterprise_user_permissions"("enterprise_user_id");

-- AddForeignKey
ALTER TABLE "enterprise_users" ADD CONSTRAINT "enterprise_users_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enterprise_users" ADD CONSTRAINT "enterprise_users_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enterprise_user_permissions" ADD CONSTRAINT "enterprise_user_permissions_user_permission_id_fkey" FOREIGN KEY ("user_permission_id") REFERENCES "user_permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enterprise_user_permissions" ADD CONSTRAINT "enterprise_user_permissions_enterprise_user_id_fkey" FOREIGN KEY ("enterprise_user_id") REFERENCES "enterprise_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "functionality" ADD CONSTRAINT "functionality_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assoc_permission_groups_functionality" ADD CONSTRAINT "assoc_permission_groups_functionality_permission_group_id_fkey" FOREIGN KEY ("permission_group_id") REFERENCES "user_permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assoc_permission_groups_functionality" ADD CONSTRAINT "assoc_permission_groups_functionality_functionality_id_fkey" FOREIGN KEY ("functionality_id") REFERENCES "functionality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assoc_permission_groups_functionality" ADD CONSTRAINT "assoc_permission_groups_functionality_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
