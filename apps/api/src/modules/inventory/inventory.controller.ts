import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Query,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreateStockItemDto, UpdateStockItemDto } from './dto/create-stock-item.dto'

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAll(
    @Request() req,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('supplierId') supplierId?: string,
    @Query('status') status?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '50',
  ) {
    const where: any = { organizationId: req.user.organizationId }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { barcode: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (categoryId && categoryId !== 'all') where.categoryId = categoryId
    if (supplierId) where.supplierId = supplierId

    const p = Number(page || 1)
    const l = Number(limit || 50)

    const items = await this.prisma.stockItem.findMany({
      where,
      include: {
        category: true,
        supplier: true,
        createdBy: { select: { firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (p - 1) * l,
      take: l,
    })

    const total = await this.prisma.stockItem.count({ where })

    return {
      data: items,
      pagination: { total, page: p, limit: l, pages: Math.ceil(total / l) },
    }
  }

  @Get('categories')
  async getCategories(@Request() req) {
    const categories = await this.prisma.stockCategory.findMany({
      where: { organizationId: req.user.organizationId },
      orderBy: { name: 'asc' },
    })
    return { data: categories }
  }

  @Get(':id')
  async getOne(@Request() req, @Param('id') id: string) {
    const item = await this.prisma.stockItem.findFirst({
      where: { id, organizationId: req.user.organizationId },
      include: {
        category: true,
        supplier: true,
        createdBy: { select: { firstName: true, lastName: true } },
        transactions: { include: { user: { select: { firstName: true, lastName: true } } }, orderBy: { createdAt: 'desc' }, take: 20 },
      },
    })

    if (!item) throw new NotFoundException('Ürün bulunamadı')
    return { data: item }
  }

  @Post()
  async create(@Request() req, @Body() dto: CreateStockItemDto) {
    const item = await this.prisma.stockItem.create({
      data: {
        ...dto,
        organizationId: req.user.organizationId,
        createdById: req.user.sub || req.user.id,
      },
      include: { category: true, supplier: true },
    })

    await this.prisma.stockTransaction.create({
      data: {
        type: 'IN',
        quantity: dto.quantity as any,
        unit: dto.unit,
        notes: 'İlk stok girişi',
        stockItemId: item.id,
        userId: req.user.sub || req.user.id,
        organizationId: req.user.organizationId,
      },
    })

    return { data: item }
  }

  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() dto: UpdateStockItemDto) {
    const existing = await this.prisma.stockItem.findFirst({ where: { id, organizationId: req.user.organizationId } })
    if (!existing) throw new NotFoundException()

    const item = await this.prisma.stockItem.update({ where: { id }, data: dto, include: { category: true, supplier: true } })
    return { data: item }
  }

  @Post(':id/adjust')
  async adjustStock(@Request() req, @Param('id') id: string, @Body() dto: { quantity: number; type: 'IN' | 'OUT' | 'ADJUST'; notes?: string }) {
    const item = await this.prisma.stockItem.findFirst({ where: { id, organizationId: req.user.organizationId } })
    if (!item) throw new NotFoundException()

    const newQuantity = dto.type === 'OUT' ? Number(item.quantity) - dto.quantity : Number(item.quantity) + dto.quantity

    const updated = await this.prisma.stockItem.update({ where: { id }, data: { quantity: newQuantity, lastUsedDate: dto.type === 'OUT' ? new Date() : undefined } })

    await this.prisma.stockTransaction.create({ data: { type: dto.type, quantity: dto.quantity as any, unit: item.unit, notes: dto.notes, stockItemId: id, userId: req.user.sub || req.user.id, organizationId: req.user.organizationId } })

    return { data: updated }
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    await this.prisma.stockItem.deleteMany({ where: { id, organizationId: req.user.organizationId } })
    return { message: 'Silindi' }
  }

  @Get('stats/summary')
  async getStats(@Request() req) {
    const orgId = req.user.organizationId
    const items = await this.prisma.stockItem.findMany({ where: { organizationId: orgId }, select: { quantity: true, minQuantity: true, purchasePrice: true } })

    const totalValue = items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.purchasePrice || 0)), 0)

    return { data: { totalItems: items.length, inStock: items.filter(i => Number(i.quantity) > Number(i.minQuantity || 0)).length, lowStock: items.filter(i => Number(i.quantity) <= Number(i.minQuantity || 0) && Number(i.quantity) > 0).length, outOfStock: items.filter(i => Number(i.quantity) <= 0).length, totalValue } }
  }
}
