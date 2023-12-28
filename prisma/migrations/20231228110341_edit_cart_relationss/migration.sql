/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CartToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_CartToProduct" DROP CONSTRAINT "_CartToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToProduct" DROP CONSTRAINT "_CartToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productCategoryId" INTEGER;

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "_CartToProduct";

-- CreateTable
CREATE TABLE "CartSession" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CartSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartSessionItem" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartSessionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductAssociation" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "cartItemId" INTEGER NOT NULL,

    CONSTRAINT "ProductAssociation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CartSession_userId_key" ON "CartSession"("userId");

-- AddForeignKey
ALTER TABLE "CartSession" ADD CONSTRAINT "CartSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartSessionItem" ADD CONSTRAINT "CartSessionItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "CartSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartSessionItem" ADD CONSTRAINT "CartSessionItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAssociation" ADD CONSTRAINT "ProductAssociation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAssociation" ADD CONSTRAINT "ProductAssociation_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "CartSessionItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
