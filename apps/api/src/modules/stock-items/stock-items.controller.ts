import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StockItemsService } from './stock-items.service';
import { CreateStockItemDto, UpdateStockItemDto, StockItemQueryDto, StockStatus } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('stock-items')
export class StockItemsController {
  constructor(private readonly stockItemsService: StockItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStockItemDto: CreateStockItemDto, @Request() req) {
    return this.stockItemsService.create(
      createStockItemDto, 
      req.user.id, 
      req.user.organizationId
    );
  }

  // Public endpoint - no auth required
   @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() queryDto: StockItemQueryDto, @Request() req) {
    console.log('Stock Items GET - User org:', req.user.organizationId);
    return this.stockItemsService.findAll(queryDto, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMyItems(@Query() queryDto: StockItemQueryDto, @Request() req) {
    return this.stockItemsService.findMyItems(
      req.user.id, 
      queryDto, 
      req.user.organizationId
    );
  }

  // Public endpoint - no auth required
  @Get('category/:categoryId')
  findByCategory(
    @Param('categoryId') categoryId: string,
    @Query() queryDto: StockItemQueryDto,
    @Request() req,
  ) {
    const organizationId = req.user?.organizationId || 'default-org-id';
    return this.stockItemsService.findByCategory(categoryId, queryDto, organizationId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    console.log('Stock Item GET by ID - User org:', req.user.organizationId);
    return this.stockItemsService.findOne(id, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockItemDto: UpdateStockItemDto,
    @Request() req,
  ) {
    return this.stockItemsService.update(
      id, 
      updateStockItemDto, 
      req.user.id, 
      req.user.organizationId
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: StockStatus,
    @Request() req,
  ) {
    return this.stockItemsService.updateStatus(
      id, 
      status, 
      req.user.id, 
      req.user.organizationId
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.stockItemsService.remove(
      id, 
      req.user.id, 
      req.user.organizationId
    );
  }
}