// @ts-nocheck
import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaTenantRepository } from '../../prisma/prisma.repository.base';
import { AllocationsService } from '../allocations/allocations.service';
import { CreateProjectDto, UpdateProjectDto, ProjectQueryDto, AllocateStockDto } from '@sciveto/shared-types';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private allocationsService: AllocationsService,
  ) {}

  private repo(organizationId: string) {
    return new PrismaTenantRepository(this.prisma, 'project', organizationId);
  }

  async create(createProjectDto: CreateProjectDto, managerId: string, organizationId: string) {
    return this.repo(organizationId).create({
      data: {
        ...createProjectDto,
        managerId,
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
    const where: any = {};

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
      this.repo(organizationId).findMany({
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
      this.repo(organizationId).count({ where }),
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
    const project = await this.repo(organizationId).findFirst({
      where: { id },
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

    const result = await this.repo(organizationId).updateMany({
      where: { id },
      data: updateProjectDto,
    });

    if (!result?.count) {
      throw new NotFoundException('Project not found');
    }

    return this.findOne(id, organizationId);
  }

  async remove(id: string, userId: string, organizationId: string) {
    const project = await this.findOne(id, organizationId);

    if (project.managerId !== userId) {
      throw new ForbiddenException('You can only delete your own projects');
    }

    await this.repo(organizationId).deleteMany({
      where: { id },
    });

    return project;
  }

  async allocateStock(projectId: string, allocateStockDto: AllocateStockDto, userId: string, organizationId: string): Promise<any> {
    return this.allocationsService.allocateItem({
      projectId,
      stockItemId: allocateStockDto.stockItemId,
      quantity: allocateStockDto.allocatedQuantity,
      allocatedPrice: allocateStockDto.allocatedPrice,
      notes: allocateStockDto.notes,
      userId,
      organizationId,
    });
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