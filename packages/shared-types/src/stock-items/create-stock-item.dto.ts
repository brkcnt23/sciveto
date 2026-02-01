import { IsString, IsOptional, IsNumber, IsEnum, IsPositive, Min, IsBoolean, IsInt } from 'class-validator';

export enum StockStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DISCONTINUED = 'DISCONTINUED',
  ARCHIVED = 'ARCHIVED'
}

export enum EntryMode {
  QUICK = 'QUICK',
  DETAILED = 'DETAILED'
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
  @IsString()
  barcode?: string;

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

  // Legacy Fields (Dual-Mode Support)
  @IsOptional()
  @IsString()
  shelfCode?: string; // Raf No / Kat

  @IsOptional()
  @IsString()
  brand?: string; // Marka

  @IsOptional()
  @IsString()
  color?: string; // Renk

  @IsOptional()
  @IsString()
  size?: string; // Beden

  @IsOptional()
  @IsNumber()
  purchasePrice?: number; // Alış Fiyatı

  @IsOptional()
  @IsNumber()
  salePrice?: number; // Satış Fiyatı 1

  @IsOptional()
  @IsNumber()
  salePrice2?: number; // Satış Fiyatı 2 / Vadeli

  @IsOptional()
  @IsInt()
  @Min(0)
  vatRate?: number; // KDV %

  @IsOptional()
  @IsString()
  specialCode1?: string; // Özel Kod 1

  @IsOptional()
  @IsString()
  specialCode2?: string; // Özel Kod 2

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

  @IsOptional()
  @IsEnum(EntryMode)
  entryMode?: EntryMode;

  @IsOptional()
  @IsBoolean()
  isComplete?: boolean;
}