// @ts-nocheck
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaTenantRepository } from '../../prisma/prisma.repository.base';
import { CreateStockItemDto, UpdateStockItemDto, StockItemQueryDto, StockStatus, QuickAddStockItemDto, EntryMode } from '@sciveto/shared-types';

@Injectable()
export class StockItemsService {
  constructor(private prisma: PrismaService) {}

  private repo(organizationId: string) {
    return new PrismaTenantRepository(this.prisma, 'stockItem', organizationId);
  }

  async create(createStockItemDto: CreateStockItemDto, userId: string, organizationId: string): Promise<any>  {
    return this.repo(organizationId).create({
      data: {
        name: createStockItemDto.name,
        description: createStockItemDto.description,
        sku: createStockItemDto.sku,
        currentStock: createStockItemDto.stock || 0,
        availableStock: createStockItemDto.stock || 0,
        lastPurchasePrice: createStockItemDto.price,
        averageCost: createStockItemDto.price,
        totalValue: (createStockItemDto.stock || 0) * (createStockItemDto.price || 0),
        status: createStockItemDto.status || 'ACTIVE',
        categoryId: createStockItemDto.categoryId,
        userId,
      },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll(queryDto: StockItemQueryDto, organizationId: string, userId?: string): Promise<any>  {
    const {
      search,
      categoryId,
      status,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = queryDto;

    console.log('StockItemsService.findAll - Query:', { categoryId, organizationId, userId, search, status, page, limit });

    const skip = (page - 1) * limit;

    const where: any = {};

    // Add filters
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (status) {
      where.status = status;
    }

    // If userId provided, filter by user
    if (userId) {
      where.userId = userId;
    }

    console.log('StockItemsService.findAll - Where clause:', where);

    const [stockItems, total] = await Promise.all([
      this.repo(organizationId).findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          category: true,
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      }),
      this.repo(organizationId).count({ where }),
    ]);

    // Transform to match frontend expectations
    const transformedStockItems = stockItems.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.lastPurchasePrice,
      sku: item.sku,
      barcode: item.barcode,
      stock: item.currentStock,
      currentStock: item.currentStock,
      reservedStock: item.reservedStock,
      availableStock: item.availableStock,
      unit: item.unit,
      status: item.status,
      imageUrl: null,
      // Legacy fields
      shelfCode: item.shelfCode,
      brand: item.brand,
      color: item.color,
      size: item.size,
      purchasePrice: item.purchasePrice,
      salePrice: item.salePrice,
      salePrice2: item.salePrice2,
      vatRate: item.vatRate,
      // Dual-Mode
      entryMode: item.entryMode,
      isComplete: item.isComplete,
      // Relations
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      categoryId: item.categoryId,
      userId: item.userId,
      category: item.category,
      user: item.user,
    }));

    return {
      data: transformedStockItems,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, organizationId: string): Promise<any>  {
    const stockItem = await this.repo(organizationId).findFirst({
      where: { id },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!stockItem) {
      throw new NotFoundException('Stock item not found');
    }

    // Transform to match frontend expectations with legacy fields
    return {
      id: stockItem.id,
      name: stockItem.name,
      description: stockItem.description,
      price: stockItem.lastPurchasePrice,
      sku: stockItem.sku,
      barcode: stockItem.barcode,
      stock: stockItem.currentStock,
      currentStock: stockItem.currentStock,
      reservedStock: stockItem.reservedStock,
      availableStock: stockItem.availableStock,
      unit: stockItem.unit,
      status: stockItem.status,
      imageUrl: null,
      // Legacy fields (Dual-Mode)
      shelfCode: stockItem.shelfCode,
      brand: stockItem.brand,
      color: stockItem.color,
      size: stockItem.size,
      purchasePrice: stockItem.purchasePrice,
      salePrice: stockItem.salePrice,
      salePrice2: stockItem.salePrice2,
      vatRate: stockItem.vatRate,
      specialCode1: stockItem.specialCode1,
      specialCode2: stockItem.specialCode2,
      // Tracking
      location: stockItem.location,
      supplier: stockItem.supplier,
      notes: stockItem.notes,
      minStockLevel: stockItem.minStockLevel,
      maxStockLevel: stockItem.maxStockLevel,
      entryMode: stockItem.entryMode,
      isComplete: stockItem.isComplete,
      // Relations
      createdAt: stockItem.createdAt,
      updatedAt: stockItem.updatedAt,
      categoryId: stockItem.categoryId,
      userId: stockItem.userId,
      category: stockItem.category,
      user: stockItem.user,
    };
  }

  async update(id: string, updateStockItemDto: UpdateStockItemDto, userId: string, organizationId: string): Promise<any>  {
    const stockItem = await this.findOne(id, organizationId);

    // Check if user owns the item
    if (stockItem.userId !== userId) {
      throw new ForbiddenException('You can only update your own items');
    }

    const data: any = {
      name: updateStockItemDto.name,
      description: updateStockItemDto.description,
      sku: updateStockItemDto.sku,
      lastPurchasePrice: updateStockItemDto.price,
      averageCost: updateStockItemDto.price,
      status: updateStockItemDto.status,
      categoryId: updateStockItemDto.categoryId,
    };

    if (updateStockItemDto.stock !== undefined) {
      data.currentStock = updateStockItemDto.stock;
      data.availableStock = updateStockItemDto.stock;
    }

    if (updateStockItemDto.stock !== undefined || updateStockItemDto.price !== undefined) {
      const currentStock = updateStockItemDto.stock ?? stockItem.stock ?? 0;
      const price = updateStockItemDto.price ?? stockItem.price ?? 0;
      data.totalValue = currentStock * price;
    }

    const result = await this.repo(organizationId).updateMany({
      where: { id },
      data,
    });

    if (!result?.count) {
      throw new NotFoundException('Stock item not found');
    }

    return this.findOne(id, organizationId);
  }

  async remove(id: string, userId: string, organizationId: string): Promise<any>  {
    const stockItem = await this.findOne(id, organizationId);

    // Check if user owns the item
    if (stockItem.userId !== userId) {
      throw new ForbiddenException('You can only delete your own items');
    }

    await this.repo(organizationId).deleteMany({
      where: { id },
    });

    return stockItem;
  }

  async findById(id: string, organizationId: string): Promise<any> {
    return this.findOne(id, organizationId);
  }
  async findMyItems(userId: string, queryDto: StockItemQueryDto, organizationId: string): Promise<any>  {
    return this.findAll({ ...queryDto, userId }, organizationId, userId);
  }

  async findByCategory(categoryId: string, queryDto: StockItemQueryDto, organizationId: string): Promise<any>  {
    console.log('StockItemsService.findByCategory - CategoryId:', categoryId, 'OrgId:', organizationId, 'QueryDto:', queryDto);
    const result = await this.findAll({ ...queryDto, categoryId }, organizationId);
    console.log('StockItemsService.findByCategory - Result:', { total: result.meta?.total, itemCount: result.data?.length });
    return result;
  }

  async updateStatus(id: string, status: StockStatus, userId: string, organizationId: string): Promise<any>  {
    return this.update(id, { status }, userId, organizationId);
  }

  async findMyStockItems(userId: string, queryDto: StockItemQueryDto, organizationId: string): Promise<any>  {
    return this.findAll(queryDto, organizationId, userId);
  } 

  async getAllocations(stockItemId: string, organizationId: string): Promise<any[]> {
    const stockItem = await this.repo(organizationId).findFirst({ where: { id: stockItemId } });

    if (!stockItem) {
      throw new NotFoundException('Stock item not found');
    }

    return this.prisma.projectAllocation.findMany({
      where: {
        stockItemId,
        project: { organizationId },
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            projectCode: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getTransactions(stockItemId: string, organizationId: string): Promise<any[]> {
    const stockItem = await this.repo(organizationId).findFirst({ where: { id: stockItemId } });

    if (!stockItem) {
      throw new NotFoundException('Stock item not found');
    }

    return this.prisma.stockTransaction.findMany({
      where: {
        stockItemId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAllocations(id: string, organizationId: string): Promise<any> {
    const stockItem = await this.repo(organizationId).findFirst({ where: { id } });
    if (!stockItem) {
      throw new NotFoundException('Stock item not found');
    }

    return this.prisma.projectAllocation.findMany({
      where: {
        stockItemId: id,
        project: {
          organizationId,
        },
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
            priority: true,
            projectCode: true,
            clientName: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getTransactions(id: string, organizationId: string): Promise<any> {
    const stockItem = await this.repo(organizationId).findFirst({ where: { id } });
    if (!stockItem) {
      throw new NotFoundException('Stock item not found');
    }

    return this.prisma.stockTransaction.findMany({
      where: {
        stockItemId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ========== DUAL-MODE ENTRY METHODS ==========

  /**
   * Hızlı ekleme - Fabrika işçileri için
   * Sadece zorunlu alanları alır, isComplete: false olarak işaretler
   */
  async quickAdd(dto: QuickAddStockItemDto, userId: string, organizationId: string): Promise<any> {
    return this.repo(organizationId).create({
      data: {
        name: dto.name,
        sku: dto.sku,
        currentStock: dto.quantity || 0,
        availableStock: dto.quantity || 0,
        unit: dto.unit || 'pcs',
        categoryId: dto.categoryId,
        notes: dto.notes,
        userId,
        entryMode: 'QUICK',
        isComplete: false,
        status: 'ACTIVE',
      },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Eksik kayıtları getir - Ofis yöneticileri tamamlaması için
   */
  async getIncompleteItems(organizationId: string, queryDto: StockItemQueryDto): Promise<any> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = queryDto;
    const skip = (page - 1) * limit;

    const where = { isComplete: false };

    const [items, total] = await Promise.all([
      this.repo(organizationId).findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          category: true,
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      this.repo(organizationId).count({ where }),
    ]);

    const transformedItems = items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.lastPurchasePrice,
      sku: item.sku,
      stock: item.currentStock,
      unit: item.unit,
      reservedStock: item.reservedStock,
      availableStock: item.availableStock,
      status: item.status,
      entryMode: item.entryMode,
      isComplete: item.isComplete,
      location: item.location,
      supplier: item.supplier,
      notes: item.notes,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      categoryId: item.categoryId,
      userId: item.userId,
      category: item.category,
      user: item.user,
    }));

    return {
      data: transformedItems,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Eksik kaydı tamamla - Detaylı bilgilerle güncelle
   */
  async completeItem(id: string, updateDto: UpdateStockItemDto, userId: string, organizationId: string): Promise<any> {
    const stockItem = await this.repo(organizationId).findFirst({ where: { id } });
    
    if (!stockItem) {
      throw new NotFoundException('Stock item not found');
    }

    const data: any = {
      description: updateDto.description,
      lastPurchasePrice: updateDto.price,
      averageCost: updateDto.price,
      minStockLevel: updateDto.minStockLevel,
      maxStockLevel: updateDto.maxStockLevel,
      location: updateDto.location,
      supplier: updateDto.supplier,
      notes: updateDto.notes,
      isComplete: true,
      entryMode: 'DETAILED',
    };

    // Sadece gönderilen değerleri güncelle
    Object.keys(data).forEach(key => {
      if (data[key] === undefined) delete data[key];
    });

    // totalValue hesapla
    if (updateDto.price !== undefined) {
      data.totalValue = (stockItem.currentStock || 0) * updateDto.price;
    }

    await this.repo(organizationId).updateMany({
      where: { id },
      data,
    });

    return this.findOne(id, organizationId);
  }
}