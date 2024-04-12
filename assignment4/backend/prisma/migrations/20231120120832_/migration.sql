/*
  Warnings:

  - You are about to drop the column `product` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `address` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "product",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" INTEGER NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "zip" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "OrderProduct" (
    "id" TEXT NOT NULL,
    "ordersId" TEXT,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "Orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
