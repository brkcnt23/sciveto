import { Module } from '@nestjs/common'
import { InventoryController } from './inventory.controller'
import { PrismaService } from '../../prisma/prisma.service'

@Module({
  controllers: [InventoryController],
  providers: [PrismaService],
})
export class InventoryModule {}
