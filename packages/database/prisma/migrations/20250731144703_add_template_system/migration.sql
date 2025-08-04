-- CreateEnum
CREATE TYPE "public"."FieldType" AS ENUM ('text', 'number', 'textarea', 'select', 'boolean', 'date', 'enum');

-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "customFields" JSONB,
ADD COLUMN     "isSystemBased" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "templateId" TEXT,
ADD COLUMN     "templateVersion" TEXT;

-- AlterTable
ALTER TABLE "public"."StockItem" ADD COLUMN     "customValues" JSONB,
ADD COLUMN     "specifications" JSONB,
ADD COLUMN     "standardValues" JSONB;

-- CreateTable
CREATE TABLE "public"."SystemCategoryTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "isLatest" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "industry" TEXT,
    "icon" TEXT,
    "changelog" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemCategoryTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TemplateStandard" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "category" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TemplateStandard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TemplateField" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "public"."FieldType" NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "defaultValue" TEXT,
    "options" JSONB,
    "validation" JSONB,
    "unit" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TemplateField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SystemCategoryTemplate_name_idx" ON "public"."SystemCategoryTemplate"("name");

-- CreateIndex
CREATE INDEX "SystemCategoryTemplate_isLatest_idx" ON "public"."SystemCategoryTemplate"("isLatest");

-- CreateIndex
CREATE UNIQUE INDEX "SystemCategoryTemplate_name_version_key" ON "public"."SystemCategoryTemplate"("name", "version");

-- CreateIndex
CREATE INDEX "TemplateStandard_templateId_idx" ON "public"."TemplateStandard"("templateId");

-- CreateIndex
CREATE INDEX "TemplateStandard_category_idx" ON "public"."TemplateStandard"("category");

-- CreateIndex
CREATE INDEX "TemplateField_templateId_idx" ON "public"."TemplateField"("templateId");

-- CreateIndex
CREATE INDEX "Category_templateId_idx" ON "public"."Category"("templateId");

-- AddForeignKey
ALTER TABLE "public"."TemplateStandard" ADD CONSTRAINT "TemplateStandard_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."SystemCategoryTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TemplateField" ADD CONSTRAINT "TemplateField_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."SystemCategoryTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."SystemCategoryTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
