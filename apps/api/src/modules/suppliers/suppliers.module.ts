import { Module } from '@nestjs/common'
import { SuppliersController } from './suppliers.controller'
import { PrismaService } from '../../prisma/prisma.service'

@Module({
  controllers: [SuppliersController],
  providers: [PrismaService],
})
export class SuppliersModule {}
