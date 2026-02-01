import { Module } from '@nestjs/common';
import { AllocationsService } from './allocations.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [AllocationsService, PrismaService],
  exports: [AllocationsService],
})
export class AllocationsModule {}
