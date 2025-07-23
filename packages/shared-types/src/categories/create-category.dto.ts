import { IsString, IsOptional, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export type PropertyType = 'text' | 'number' | 'textarea' | 'select' | 'boolean';

export interface CategoryProperty {
  id: string;
  name: string;
  type: PropertyType;
  required: boolean;
  options?: string[];
  placeholder?: string;
  unit?: string;
  optionsText?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  isDefault: boolean;
  properties: CategoryProperty[];
  createdAt: Date;
  updatedAt: Date;
  itemCount?: number;
  totalValue?: number;
  lowStockItems?: number;
  activeProjects?: number;
}

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  color: string;

  @IsString()
  icon: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  properties: Omit<CategoryProperty, 'id'>[];
}