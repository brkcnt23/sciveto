import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '@sciveto/shared-types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req): Promise<any> {
    console.log('Categories POST - User org:', req.user.organizationId);
    return this.categoriesService.create(createCategoryDto, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<any> {
    try {
      const organizationId = req.user.organizationId;
      const categories = await this.categoriesService.findAll(organizationId);
      return categories;
    } catch (error) {
      console.error('Categories GET - Error:', error);
      return [];
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<any> {
    const organizationId = req.user.organizationId;
    const category = await this.categoriesService.findOne(id, organizationId);
    return category;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Request() req): Promise<any> {
    return this.categoriesService.update(id, updateCategoryDto, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req): Promise<any> {
    return this.categoriesService.remove(id, req.user.organizationId);
  }
}