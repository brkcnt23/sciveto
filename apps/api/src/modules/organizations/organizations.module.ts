import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { CodeGeneratorService } from './code-generator.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, CodeGeneratorService, PrismaService],
  exports: [OrganizationsService, CodeGeneratorService],
})
export class OrganizationsModule {}
