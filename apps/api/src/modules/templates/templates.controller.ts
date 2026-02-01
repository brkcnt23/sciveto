// @ts-nocheck
import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { 
  TemplateQueryDto, 
  CreateCategoryFromTemplateDto,
  CreateCategoryFromTemplateResponse
} from '@sciveto/shared-types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: TemplateQueryDto): Promise<any> {
    console.log('Templates GET - Request received');
    return this.templatesService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('industries')
  async getIndustries(): Promise<string[]> {
    return this.templatesService.getIndustries();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.templatesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-category')
  async createCategory(@Body() dto: CreateCategoryFromTemplateDto, @Request() req): Promise<CreateCategoryFromTemplateResponse> {
    console.log('Create category DTO:', dto);
    console.log('User organizationId:', req.user.organizationId);
    
    // Override organizationId with user's organization
    dto.organizationId = req.user.organizationId;
    
    try {
      const result = await this.templatesService.createCategoryFromTemplate(dto);
      console.log('Create category result:', result);
      return result;
    } catch (error) {
      console.error('Create category error:', error);
      throw error;
    }
  }
}
