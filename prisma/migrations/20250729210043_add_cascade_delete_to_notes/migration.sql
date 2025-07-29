-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
