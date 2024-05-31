/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `apprenant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `coach` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "apprenant_email_key" ON "apprenant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "coach_email_key" ON "coach"("email");
