-- CreateTable
CREATE TABLE "enterprise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "logo" BYTEA,
    "banner" BYTEA,
    "address_id" INTEGER NOT NULL,

    CONSTRAINT "enterprise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "zip_code" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enterprise_opening_hours" (
    "id" SERIAL NOT NULL,
    "hour_start" TEXT NOT NULL,
    "hour_end" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "week_day_id" INTEGER NOT NULL,
    "enterprise_id" INTEGER NOT NULL,

    CONSTRAINT "enterprise_opening_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "week_days" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "week_days_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "enterprise_phone_key" ON "enterprise"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "enterprise_url_key" ON "enterprise"("url");

-- CreateIndex
CREATE INDEX "enterprise_opening_hours_id_idx" ON "enterprise_opening_hours"("id");

-- CreateIndex
CREATE INDEX "enterprise_opening_hours_week_day_id_idx" ON "enterprise_opening_hours"("week_day_id");

-- CreateIndex
CREATE INDEX "enterprise_opening_hours_enterprise_id_idx" ON "enterprise_opening_hours"("enterprise_id");

-- CreateIndex
CREATE INDEX "enterprise_opening_hours_enterprise_id_week_day_id_idx" ON "enterprise_opening_hours"("enterprise_id", "week_day_id");

-- CreateIndex
CREATE UNIQUE INDEX "week_days_description_key" ON "week_days"("description");

-- CreateIndex
CREATE UNIQUE INDEX "week_days_abbreviation_key" ON "week_days"("abbreviation");

-- CreateIndex
CREATE INDEX "week_days_id_idx" ON "week_days"("id");

-- AddForeignKey
ALTER TABLE "enterprise" ADD CONSTRAINT "enterprise_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enterprise_opening_hours" ADD CONSTRAINT "enterprise_opening_hours_week_day_id_fkey" FOREIGN KEY ("week_day_id") REFERENCES "week_days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enterprise_opening_hours" ADD CONSTRAINT "enterprise_opening_hours_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
