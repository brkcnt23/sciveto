import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaTenantRepository } from '../../prisma/prisma.repository.base';

interface AllocateItemParams {
  projectId: string;
  stockItemId: string;
  quantity: number;
  allocatedPrice?: number;
  notes?: string;
  userId: string;
  organizationId: string;
}

@Injectable()
export class AllocationsService {
  constructor(private prisma: PrismaService) {}

  async allocateItem({
    projectId,
    stockItemId,
    quantity,
    allocatedPrice,
    notes,
    userId,
    organizationId,
  }: AllocateItemParams) {
    const projectRepo = new PrismaTenantRepository(this.prisma, 'project', organizationId);
    const stockRepo = new PrismaTenantRepository(this.prisma, 'stockItem', organizationId);

    const project = await projectRepo.findFirst({ where: { id: projectId } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const stockItem = await stockRepo.findFirst({ where: { id: stockItemId } });
    if (!stockItem) {
      throw new NotFoundException('Stock item not found');
    }

    if (stockItem.availableStock < quantity) {
      throw new BadRequestException(
        `Insufficient stock. Available: ${stockItem.availableStock}, Requested: ${quantity}`
      );
    }

    const unitPrice = allocatedPrice ?? stockItem.lastPurchasePrice ?? 0;

    const allocation = await this.prisma.projectAllocation.create({
      data: {
        projectId,
        stockItemId,
        userId,
        allocatedQuantity: quantity,
        allocatedPrice: unitPrice,
        totalAllocatedCost: quantity * unitPrice,
        notes,
      },
      include: {
        stockItem: {
          include: {
            category: true,
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
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    await stockRepo.updateMany({
      where: { id: stockItemId },
      data: {
        reservedStock: { increment: quantity },
        availableStock: { decrement: quantity },
      },
    });

    await projectRepo.updateMany({
      where: { id: projectId },
      data: {
        actualCost: { increment: allocation.totalAllocatedCost },
      },
    });

    return allocation;
  }
}
