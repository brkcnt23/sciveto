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
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    return this.categoriesService.create(createCategoryDto, req.user.organizationId);
  }

  // Public endpoint - no auth required
  @Get()
  findAll(@Request() req) {
    const organizationId = req.user?.organizationId || 'default-org-id';
    return this.categoriesService.findAll(organizationId);
  }

  // Public endpoint - no auth required
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const organizationId = req.user?.organizationId || 'default-org-id';
    return this.categoriesService.findOne(id, organizationId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Request() req) {
    return this.categoriesService.update(id, updateCategoryDto, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.categoriesService.remove(id, req.user.organizationId);
  }
}