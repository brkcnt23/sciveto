// @ts-nocheck
import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { AllocationsModule } from '../allocations/allocations.module';
import { AllocationsModule } from '../allocations/allocations.module';

@Module({
  imports: [AllocationsModule],
  imports: [AllocationsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
  exports: [ProjectsService],
})
export class ProjectsModule {}