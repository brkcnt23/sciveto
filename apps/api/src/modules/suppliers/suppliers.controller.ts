import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSupplierDto, UpdateSupplierDto } from './dto';

@Controller('suppliers')
@UseGuards(JwtAuthGuard)
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) {}

  @Get()
  async findAll(@Request() req) {
    const data = await this.suppliersService.findAll(req.user.organizationId);
    return { data };
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const data = await this.suppliersService.findOne(id, req.user.organizationId);
    return { data };
  }

  @Post()
  async create(@Request() req, @Body() dto: CreateSupplierDto) {
    const data = await this.suppliersService.create(dto, req.user.organizationId);
    return { data };
  }

  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() dto: UpdateSupplierDto) {
    const data = await this.suppliersService.update(id, dto, req.user.organizationId);
    return { data };
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const data = await this.suppliersService.remove(id, req.user.organizationId);
    return { data };
  }
}
