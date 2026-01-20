import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CardsController],
  providers: [CardsService, PrismaService],
  exports: [CardsService],
})
export class CardsModule {}
