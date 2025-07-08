import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStockItemDto, UpdateStockItemDto, StockItemQueryDto, StockStatus } from './dto';

@Injectable()
export class StockItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createStockItemDto: CreateStockItemDto, userId: string, organizationId: string) {
    return this.prisma.stockItem.create({
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
        organizationId,
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

  async findAll(queryDto: StockItemQueryDto, organizationId: string, userId?: string) {
    const {
      search,
      categoryId,
      status,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = queryDto;

    const skip = (page - 1) * limit;

    const where: any = { organizationId };

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

    const [stockItems, total] = await Promise.all([
      this.prisma.stockItem.findMany({
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
      this.prisma.stockItem.count({ where }),
    ]);

    // Transform to match frontend expectations
    const transformedStockItems = stockItems.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.lastPurchasePrice,
      sku: item.sku,
      stock: item.currentStock,
      status: item.status,
      imageUrl: null, // Will add later
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

  async findOne(id: string, organizationId: string) {
    const stockItem = await this.prisma.stockItem.findFirst({
      where: { id, organizationId },
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

    // Transform to match frontend expectations
    return {
      id: stockItem.id,
      name: stockItem.name,
      description: stockItem.description,
      price: stockItem.lastPurchasePrice,
      sku: stockItem.sku,
      stock: stockItem.currentStock,
      status: stockItem.status,
      imageUrl: null,
      createdAt: stockItem.createdAt,
      updatedAt: stockItem.updatedAt,
      categoryId: stockItem.categoryId,
      userId: stockItem.userId,
      category: stockItem.category,
      user: stockItem.user,
    };
  }

  async update(id: string, updateStockItemDto: UpdateStockItemDto, userId: string, organizationId: string) {
    const stockItem = await this.findOne(id, organizationId);

    // Check if user owns the item
    if (stockItem.userId !== userId) {
      throw new ForbiddenException('You can only update your own items');
    }

    return this.prisma.stockItem.update({
      where: { id },
      data: {
        name: updateStockItemDto.name,
        description: updateStockItemDto.description,
        sku: updateStockItemDto.sku,
        lastPurchasePrice: updateStockItemDto.price,
        averageCost: updateStockItemDto.price,
        status: updateStockItemDto.status,
        categoryId: updateStockItemDto.categoryId,
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

  async remove(id: string, userId: string, organizationId: string) {
    const stockItem = await this.findOne(id, organizationId);

    // Check if user owns the item
    if (stockItem.userId !== userId) {
      throw new ForbiddenException('You can only delete your own items');
    }

    return this.prisma.stockItem.delete({
      where: { id },
    });
  }

  async findById(id: string, organizationId: string) {
    return this.findOne(id, organizationId);
  }
  async findMyItems(userId: string, queryDto: StockItemQueryDto, organizationId: string) {
    return this.findAll({ ...queryDto, userId }, organizationId, userId);
  }

  async findByCategory(categoryId: string, queryDto: StockItemQueryDto, organizationId: string) {
    return this.findAll({ ...queryDto, categoryId }, organizationId);
  }

  async updateStatus(id: string, status: StockStatus, userId: string, organizationId: string) {
    return this.update(id, { status }, userId, organizationId);
  }

  async findMyStockItems(userId: string, queryDto: StockItemQueryDto, organizationId: string) {
    return this.findAll(queryDto, organizationId, userId);
  }
}