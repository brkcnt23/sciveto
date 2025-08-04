// packages/shared-types/src/templates/template.types.ts

export interface SystemTemplate {
  id: string;
  name: string;
  version: string;
  isLatest: boolean;
  description: string | null;
  industry: string | null;
  icon: string | null;
  changelog: string | null;
  createdAt: Date;
  updatedAt: Date;
  standards: TemplateStandard[];
  fields: TemplateField[];
}

export interface TemplateStandard {
  id: string;
  name: string;
  value: string;
  category: string | null;
  templateId: string;
  sortOrder: number;
}

export interface TemplateField {
  id: string;
  templateId: string;
  name: string;
  label: string;
  type: any; // Prisma FieldType ile uyumlu olmak için
  required: boolean;
  defaultValue: string | null;
  options: any;
  validation: any;
  unit: string | null;
  sortOrder: number;
}

export enum TemplateFieldType {
  text = 'text',
  number = 'number',
  textarea = 'textarea',
  select = 'select',
  boolean = 'boolean',
  date = 'date',
  enum = 'enum'
}

export interface TemplateListResponse {
  templates: SystemTemplate[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
