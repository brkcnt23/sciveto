// @ts-nocheck
import { IsString, IsOptional, IsNumber, IsEnum, IsPositive, Min } from 'class-validator';

export enum StockStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DISCONTINUED = 'DISCONTINUED',
  ARCHIVED = 'ARCHIVED'
}

export class CreateStockItemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsString()
  unit?: string; // pcs, kg, m, m2, m3

  @IsOptional()
  @IsNumber()
  @Min(0)
  minStockLevel?: number;

  @IsOptional()
  @IsNumber()
  maxStockLevel?: number;

  @IsOptional()
  @IsEnum(StockStatus)
  status?: StockStatus;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  supplier?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;
}