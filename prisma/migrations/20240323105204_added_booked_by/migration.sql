/*
  Warnings:

  - You are about to drop the column `available` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "available",
ADD COLUMN     "bookedById" TEXT;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_bookedById_fkey" FOREIGN KEY ("bookedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
