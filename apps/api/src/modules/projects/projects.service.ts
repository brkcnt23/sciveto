// @ts-nocheck
import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto, ProjectQueryDto, AllocateStockDto } from './dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, managerId: string, organizationId: string) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        managerId,
        organizationId,
        actualCost: 0,
      },
      include: {
        manager: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            allocations: true,
          },
        },
      },
    });
  }

  async findAll(queryDto: ProjectQueryDto, organizationId: string) {
    const {
      search,
      status,
      priority,
      managerId,
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
        { projectCode: { contains: search, mode: 'insensitive' } },
        { clientName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (managerId) where.managerId = managerId;

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          manager: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          _count: {
            select: {
              allocations: true,
            },
          },
        },
      }),
      this.prisma.project.count({ where }),
    ]);

    return {
      data: projects,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, organizationId: string): Promise<any> {
    const project = await this.prisma.project.findFirst({
      where: { id, organizationId },
      include: {
        manager: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
        allocations: {
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
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string, organizationId: string) {
    const project = await this.findOne(id, organizationId);

    // Check if user can update (manager or admin)
    if (project.managerId !== userId) {
      // TODO: Add role-based permission check
      throw new ForbiddenException('You can only update your own projects');
    }

    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
      include: {
        manager: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: {
            allocations: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string, organizationId: string) {
    const project = await this.findOne(id, organizationId);

    if (project.managerId !== userId) {
      throw new ForbiddenException('You can only delete your own projects');
    }

    return this.prisma.project.delete({
      where: { id },
    });
  }

  async allocateStock(projectId: string, allocateStockDto: AllocateStockDto, userId: string, organizationId: string): Promise<any> {
    const project = await this.findOne(projectId, organizationId);
    
    // Check if stock item exists and belongs to organization
    const stockItem = await this.prisma.stockItem.findFirst({
      where: {
        id: allocateStockDto.stockItemId,
        organizationId,
      },
    });

    if (!stockItem) {
      throw new NotFoundException('Stock item not found');
    }

    // Check if enough stock is available
    if (stockItem.availableStock < allocateStockDto.allocatedQuantity) {
      throw new BadRequestException(
        `Insufficient stock. Available: ${stockItem.availableStock}, Requested: ${allocateStockDto.allocatedQuantity}`
      );
    }

    // Create allocation
    const allocation = await this.prisma.projectAllocation.create({
      data: {
        projectId,
        stockItemId: allocateStockDto.stockItemId,
        userId,
        allocatedQuantity: allocateStockDto.allocatedQuantity,
        allocatedPrice: allocateStockDto.allocatedPrice,
        totalAllocatedCost: allocateStockDto.allocatedQuantity * allocateStockDto.allocatedPrice,
        notes: allocateStockDto.notes,
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
      },
    });

    // Update stock item
    await this.prisma.stockItem.update({
      where: { id: allocateStockDto.stockItemId },
      data: {
        reservedStock: {
          increment: allocateStockDto.allocatedQuantity,
        },
        availableStock: {
          decrement: allocateStockDto.allocatedQuantity,
        },
      },
    });

    // Update project cost
    await this.prisma.project.update({
      where: { id: projectId },
      data: {
        actualCost: {
          increment: allocation.totalAllocatedCost,
        },
      },
    });

    return allocation;
  }

  async getProjectAllocations(projectId: string, organizationId: string): Promise<any> {
    const project = await this.findOne(projectId, organizationId);
    
    return this.prisma.projectAllocation.findMany({
      where: { projectId },
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateAllocationUsage(
    allocationId: string,
    usedQuantity: number,
    userId: string,
    organizationId: string
  ) {
    const allocation = await this.prisma.projectAllocation.findFirst({
      where: {
        id: allocationId,
        project: {
          organizationId,
        },
      },
      include: {
        stockItem: true,
        project: true,
      },
    });

    if (!allocation) {
      throw new NotFoundException('Allocation not found');
    }

    if (usedQuantity > allocation.allocatedQuantity) {
      throw new BadRequestException('Used quantity cannot exceed allocated quantity');
    }

    // Calculate the difference in usage
    const usageDifference = usedQuantity - allocation.usedQuantity;

    // Update allocation
    const updatedAllocation = await this.prisma.projectAllocation.update({
      where: { id: allocationId },
      data: {
        usedQuantity,
        status: usedQuantity === allocation.allocatedQuantity ? 'FULLY_USED' : 
                usedQuantity > 0 ? 'PARTIALLY_USED' : 'RESERVED',
        usageDate: usedQuantity > allocation.usedQuantity ? new Date() : allocation.usageDate,
      },
    });

    // Update stock item (move from reserved to used)
    if (usageDifference !== 0) {
      await this.prisma.stockItem.update({
        where: { id: allocation.stockItemId },
        data: {
          currentStock: {
            decrement: usageDifference,
          },
          reservedStock: {
            decrement: usageDifference,
          },
        },
      });

      // Create stock transaction
      await this.prisma.stockTransaction.create({
        data: {
          stockItemId: allocation.stockItemId,
          type: 'ALLOCATION',
          quantity: -usageDifference,
          unitPrice: allocation.allocatedPrice,
          totalCost: usageDifference * allocation.allocatedPrice,
          referenceType: 'project',
          referenceId: allocation.projectId,
          description: `Used in project: ${allocation.project.name}`,
          performedBy: userId,
        },
      });
    }

    return updatedAllocation;
  }
}