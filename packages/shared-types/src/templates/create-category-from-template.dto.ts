// packages/shared-types/src/templates/create-category-from-template.dto.ts

export interface CreateCategoryFromTemplateDto {
  templateId: string;
  organizationId?: string;
  categoryName: string;
  description?: string;
  color?: string;
}

export interface CreateCategoryFromTemplateResponse {
  success: boolean;
  categoryId?: string;
  message: string;
}
