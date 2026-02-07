import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

export class CreateStockItemDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  code?: string

  @IsOptional()
  @IsString()
  barcode?: string

  @IsOptional()
  @IsString()
  icon?: string

  @IsOptional()
  @IsString()
  categoryId?: string

  @IsOptional()
  @IsString()
  supplierId?: string

  @IsNumber()
  quantity: number

  @IsString()
  unit: string

  @IsOptional()
  @IsNumber()
  minQuantity?: number

  @IsOptional()
  @IsNumber()
  maxQuantity?: number

  @IsOptional()
  @IsString()
  warehouseLocation?: string

  @IsOptional()
  @IsString()
  zone?: string

  @IsOptional()
  @IsNumber()
  purchasePrice?: number

  @IsOptional()
  @IsNumber()
  sellingPrice?: number

  @IsOptional()
  @IsString()
  currency?: string

  @IsOptional()
  @IsString()
  supplierCode?: string

  @IsOptional()
  @IsNumber()
  leadTime?: number

  @IsOptional()
  @IsString()
  serialNumber?: string

  @IsOptional()
  @IsString()
  lotNumber?: string

  @IsOptional()
  @IsNumber()
  warrantyMonths?: number

  @IsOptional()
  specifications?: any

  @IsOptional()
  @IsBoolean()
  isCritical?: boolean
}

export class UpdateStockItemDto extends PartialType(CreateStockItemDto) {}
