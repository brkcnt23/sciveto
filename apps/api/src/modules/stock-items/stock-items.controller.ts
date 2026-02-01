// @ts-nocheck
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
import { CreateStockItemDto, UpdateStockItemDto, StockItemQueryDto, StockStatus, QuickAddStockItemDto } from '@sciveto/shared-types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('stock-items')
export class StockItemsController {
  constructor(private readonly stockItemsService: StockItemsService) {}

  // ========== DUAL-MODE ENTRY ENDPOINTS ==========

  /**
   * Hızlı ekleme - Fabrika işçileri için
   * POST /stock-items/quick
   */
  @UseGuards(JwtAuthGuard)
  @Post('quick')
  quickAdd(@Body() dto: QuickAddStockItemDto, @Request() req) {
    return this.stockItemsService.quickAdd(
      dto,
      req.user.id,
      req.user.organizationId
    );
  }

  /**
   * Eksik kayıtları getir - Ofis yöneticileri için
   * GET /stock-items/incomplete
   */
  @UseGuards(JwtAuthGuard)
  @Get('incomplete')
  getIncompleteItems(@Query() queryDto: StockItemQueryDto, @Request() req) {
    return this.stockItemsService.getIncompleteItems(
      req.user.organizationId,
      queryDto
    );
  }

  /**
   * Eksik kaydı tamamla
   * PATCH /stock-items/:id/complete
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/complete')
  completeItem(
    @Param('id') id: string,
    @Body() updateDto: UpdateStockItemDto,
    @Request() req
  ) {
    return this.stockItemsService.completeItem(
      id,
      updateDto,
      req.user.id,
      req.user.organizationId
    );
  }

  // ========== EXISTING ENDPOINTS ==========

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

  // Protected endpoint - auth required - TEMPORARILY DISABLED FOR DEBUG  
  // @UseGuards(JwtAuthGuard)
  @Get('category/:categoryId')
  findByCategory(
    @Param('categoryId') categoryId: string,
    @Query() queryDto: StockItemQueryDto,
    @Request() req,
  ) {
    console.log('🔍 FindByCategory - CategoryId:', categoryId, 'NO AUTH - using demo org');
    // Temporarily use demo org ID
    return this.stockItemsService.findByCategory(categoryId, queryDto, 'cmdx0yamq0000e4kwlmpedajf');
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/allocations')
  getAllocations(@Param('id') id: string, @Request() req) {
    return this.stockItemsService.getAllocations(id, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/transactions')
  getTransactions(@Param('id') id: string, @Request() req) {
    return this.stockItemsService.getTransactions(id, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    console.log('Stock Item GET by ID - User org:', req.user.organizationId);
    return this.stockItemsService.findOne(id, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/allocations')
  getAllocations(@Param('id') id: string, @Request() req) {
    return this.stockItemsService.getAllocations(id, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/transactions')
  getTransactions(@Param('id') id: string, @Request() req) {
    return this.stockItemsService.getTransactions(id, req.user.organizationId);
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