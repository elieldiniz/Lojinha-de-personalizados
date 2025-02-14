/*
  Warnings:

  - Added the required column `maior_preco` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menor_preco` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco_medio` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "maior_preco" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "menor_preco" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "preco_medio" DOUBLE PRECISION NOT NULL;
