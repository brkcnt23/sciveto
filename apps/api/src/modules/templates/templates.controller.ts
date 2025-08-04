// @ts-nocheck
// @ts-nocheck
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { 
  TemplateQueryDto, 
  CreateCategoryFromTemplateDto,
  CreateCategoryFromTemplateResponse
} from '@sciveto/shared-types';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  async findAll(@Query() query: TemplateQueryDto): Promise<any> {
    return this.templatesService.findAll(query);
  }

  @Get('industries')
  async getIndustries(): Promise<string[]> {
    return this.templatesService.getIndustries();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.templatesService.findOne(id);
  }

  @Post('create-category')
  async createCategory(@Body() dto: CreateCategoryFromTemplateDto): Promise<CreateCategoryFromTemplateResponse> {
    return this.templatesService.createCategoryFromTemplate(dto);
  }
}
