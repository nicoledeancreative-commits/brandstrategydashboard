-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "illustrations" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "patterns" TEXT NOT NULL DEFAULT '[null,null]';
