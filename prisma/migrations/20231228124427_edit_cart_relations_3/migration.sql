/*
  Warnings:

  - You are about to drop the `ProductAssociation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductAssociation" DROP CONSTRAINT "ProductAssociation_cartItemId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAssociation" DROP CONSTRAINT "ProductAssociation_productId_fkey";

-- DropTable
DROP TABLE "ProductAssociation";
