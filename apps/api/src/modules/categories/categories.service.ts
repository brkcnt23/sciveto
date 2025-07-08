import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto, organizationId: string) {
    try {
      return await this.prisma.category.create({
        data: {
          ...createCategoryDto,
          organizationId,
        },
        include: {
          _count: {
            select: {
              stockItems: true,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Category with this name already exists');
      }
      throw error;
    }
  }

  async findAll(organizationId: string) {
    return this.prisma.category.findMany({
      where: { organizationId },
      include: {
        _count: {
          select: {
            stockItems: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string, organizationId: string) {
    const category = await this.prisma.category.findFirst({
      where: { id, organizationId },
      include: {
        _count: {
          select: {
            stockItems: true,
          },
        },
        stockItems: {
          take: 10,
          select: {
            id: true,
            name: true,
            lastPurchasePrice: true,
            status: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, organizationId: string) {
    try {
      const category = await this.prisma.category.update({
        where: { 
          id,
          organizationId, // Ensure user can only update their org's categories
        },
        data: updateCategoryDto,
        include: {
          _count: {
            select: {
              stockItems: true,
            },
          },
        },
      });
      return category;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Category not found');
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Category with this name already exists');
      }
      throw error;
    }
  }

  async remove(id: string, organizationId: string) {
    try {
      return await this.prisma.category.delete({
        where: { 
          id,
          organizationId, // Ensure user can only delete their org's categories
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Category not found');
      }
      throw error;
    }
  }
}