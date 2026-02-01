import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { EntryMode } from './create-stock-item.dto';

// Re-export for convenience
export { EntryMode };

/**
 * Fabrika işçileri için hızlı giriş DTO'su
 * Sadece zorunlu alanlar - 5 saniyede giriş yapılabilir
 */
export class QuickAddStockItemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
