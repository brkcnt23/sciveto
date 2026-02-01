import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';

class CreateOrganizationDto {
  name: string;
  subdomain: string;
  settings?: Record<string, any>;
}

class UpdateOrganizationDto {
  name?: string;
  settings?: Record<string, any>;
}

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  async create(@Body() dto: CreateOrganizationDto) {
    const organization = await this.organizationsService.create(dto);
    return { success: true, data: organization };
  }

  @Get()
  async findAll() {
    const organizations = await this.organizationsService.findAll();
    return { success: true, data: organizations };
  }

  @Get('default')
  async getDefault() {
    const organization = await this.organizationsService.getOrCreateDefault();
    return { success: true, data: organization };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const organization = await this.organizationsService.findOne(id);
    return { success: true, data: organization };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateOrganizationDto) {
    const organization = await this.organizationsService.update(id, dto);
    return { success: true, data: organization };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.organizationsService.delete(id);
    return { success: true, message: 'Organization deleted successfully' };
  }
}
