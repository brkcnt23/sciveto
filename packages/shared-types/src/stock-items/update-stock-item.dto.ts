import { PartialType } from '@nestjs/mapped-types';
import { CreateStockItemDto } from './create-stock-item.dto';

export class UpdateStockItemDto extends PartialType(CreateStockItemDto) {}