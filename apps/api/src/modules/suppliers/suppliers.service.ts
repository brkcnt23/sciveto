import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSupplierDto, UpdateSupplierDto } from './dto';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  async findAll(organizationId: string) {
    return this.prisma.supplier.findMany({
      where: { organizationId },
      include: { _count: { select: { items: true, purchaseOrders: true } } },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string, organizationId: string) {
    const supplier = await this.prisma.supplier.findFirst({
      where: { id, organizationId },
      include: {
        items: true,
        purchaseOrders: true,
      },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    return supplier;
  }

  async create(dto: CreateSupplierDto, organizationId: string) {
    const count = await this.prisma.supplier.count({ where: { organizationId } });
    const code = `SUP-${String(count + 1).padStart(3, '0')}`;

    try {
      return await this.prisma.supplier.create({
        data: { ...dto, code, organizationId },
        include: { _count: { select: { items: true } } },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Supplier code already exists');
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateSupplierDto, organizationId: string) {
    try {
      return await this.prisma.supplier.update({
        where: { id, organizationId },
        data: dto,
        include: { _count: { select: { items: true } } },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Supplier not found');
      }
      throw error;
    }
  }

  async remove(id: string, organizationId: string) {
    try {
      return await this.prisma.supplier.delete({
        where: { id, organizationId },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Supplier not found');
      }
      throw error;
    }
  }
}
