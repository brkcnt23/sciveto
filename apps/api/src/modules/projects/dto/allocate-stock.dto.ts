import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class AllocateStockDto {
  @IsString()
  stockItemId: string;

  @IsNumber()
  @IsPositive()
  allocatedQuantity: number;

  @IsNumber()
  @IsPositive()
  allocatedPrice: number;

  @IsOptional()
  @IsString()
  notes?: string;
}