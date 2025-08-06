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
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
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

  // For testing - temporary without auth
  @Get()
  async findAll(@Request() req?): Promise<any> {
    try {
      // Development mode - use hardcoded org for testing
      const organizationId = req?.user?.organizationId || 'cmdx0yamq0000e4kwlmpedajf';
      console.log('Categories GET - Looking for org:', organizationId);
      
      const categories = await this.categoriesService.findAll(organizationId);
      console.log('Categories GET - Found categories:', categories.length);
      console.log('Categories GET - Data sample:', JSON.stringify(categories[0], null, 2));
      
      return categories;
    } catch (error) {
      console.error('Categories GET - Error:', error);
      
      // Return empty array as fallback
      return [];
    }
  }

  // Get single category - temporary without auth for development
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req?): Promise<any> {
    try {
      // Development mode - use hardcoded org for testing
      const organizationId = req?.user?.organizationId || 'cmdx0yamq0000e4kwlmpedajf';
      console.log('Category GET - Looking for category:', id, 'in org:', organizationId);
      
      const category = await this.categoriesService.findOne(id, organizationId);
      console.log('Category GET - Found category:', category);
      
      return category;
    } catch (error) {
      console.error('Category GET - Error:', error);
      throw error;
    }
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