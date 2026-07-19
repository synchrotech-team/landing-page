-- CreateEnum
CREATE TYPE "LicenseStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'REVOKED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "team_name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "licenses" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "license_key" TEXT NOT NULL,
    "status" "LicenseStatus" NOT NULL DEFAULT 'INACTIVE',
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "max_devices" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "licenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" SERIAL NOT NULL,
    "license_id" INTEGER NOT NULL,
    "device_id" TEXT NOT NULL,
    "device_name" TEXT NOT NULL,
    "windows_username" TEXT NOT NULL,
    "activated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_validation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "licenses_license_key_key" ON "licenses"("license_key");

-- CreateIndex
CREATE UNIQUE INDEX "devices_license_id_device_id_key" ON "devices"("license_id", "device_id");

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "licenses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_license_id_fkey" FOREIGN KEY ("license_id") REFERENCES "licenses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
