import { Module } from '@nestjs/common';
import { CanvasController } from './canvas.controller';
import { CanvasService } from './canvas.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CanvasController],
  providers: [CanvasService, PrismaService],
  exports: [CanvasService],
})
export class CanvasModule {}
