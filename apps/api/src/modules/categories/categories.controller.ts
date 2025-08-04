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

  // For testing, let's make this require auth temporarily to ensure we get the right org
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<any> {
    try {
      console.log('Categories GET - Full user object:', req.user);
      const organizationId = req.user.organizationId;
      console.log('Categories GET - Looking for org:', organizationId);
      
      const categories = await this.categoriesService.findAll(organizationId);
      console.log('Categories GET - Found categories:', categories.length);
      
      return categories;
    } catch (error) {
      console.error('Categories GET - Error:', error);
      
      // Return empty array as fallback
      return [];
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req): Promise<any> {
    const organizationId = req.user.organizationId;
    return this.categoriesService.findOne(id, organizationId);
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