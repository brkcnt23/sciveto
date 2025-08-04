// @ts-nocheck
import { Module } from '@nestjs/common';
import { StockItemsService } from './stock-items.service';
import { StockItemsController } from './stock-items.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [StockItemsController],
  providers: [StockItemsService, PrismaService],
  exports: [StockItemsService],
})
export class StockItemsModule {}