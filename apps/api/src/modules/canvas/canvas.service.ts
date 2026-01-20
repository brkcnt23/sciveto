// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCanvasDto, UpdateCanvasDto, CreateCanvasNodeDto, CreateCanvasEdgeDto } from './dto';

@Injectable()
export class CanvasService {
  constructor(private prisma: PrismaService) {}

  async create(createCanvasDto: CreateCanvasDto, organizationId: string) {
    // Verify project belongs to organization
    const project = await this.prisma.project.findFirst({
      where: {
        id: createCanvasDto.projectId,
        organizationId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.prisma.canvas.create({
      data: createCanvasDto,
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            nodes: true,
            edges: true,
          },
        },
      },
    });
  }

  async findAllByProject(projectId: string, organizationId: string) {
    // Verify project belongs to organization
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        organizationId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.prisma.canvas.findMany({
      where: {
        projectId,
      },
      include: {
        _count: {
          select: {
            nodes: true,
            edges: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findOne(id: string, organizationId: string) {
    const canvas = await this.prisma.canvas.findFirst({
      where: {
        id,
        project: {
          organizationId,
        },
      },
      include: {
        nodes: {
          include: {
            sourceEdges: true,
            targetEdges: true,
          },
        },
        edges: {
          include: {
            source: true,
            target: true,
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

    if (!canvas) {
      throw new NotFoundException('Canvas not found');
    }

    return canvas;
  }

  async update(id: string, updateCanvasDto: UpdateCanvasDto, organizationId: string) {
    const canvas = await this.prisma.canvas.findFirst({
      where: {
        id,
        project: {
          organizationId,
        },
      },
    });

    if (!canvas) {
      throw new NotFoundException('Canvas not found');
    }

    return this.prisma.canvas.update({
      where: { id },
      data: updateCanvasDto,
    });
  }

  async remove(id: string, organizationId: string) {
    const canvas = await this.prisma.canvas.findFirst({
      where: {
        id,
        project: {
          organizationId,
        },
      },
    });

    if (!canvas) {
      throw new NotFoundException('Canvas not found');
    }

    await this.prisma.canvas.delete({
      where: { id },
    });

    return { message: 'Canvas deleted successfully' };
  }

  // Canvas Nodes
  async createNode(createNodeDto: CreateCanvasNodeDto, organizationId: string) {
    const canvas = await this.prisma.canvas.findFirst({
      where: {
        id: createNodeDto.canvasId,
        project: {
          organizationId,
        },
      },
    });

    if (!canvas) {
      throw new NotFoundException('Canvas not found');
    }

    return this.prisma.canvasNode.create({
      data: createNodeDto,
    });
  }

  async updateNode(id: string, updateData: Partial<CreateCanvasNodeDto>, organizationId: string) {
    const node = await this.prisma.canvasNode.findFirst({
      where: {
        id,
        canvas: {
          project: {
            organizationId,
          },
        },
      },
    });

    if (!node) {
      throw new NotFoundException('Node not found');
    }

    return this.prisma.canvasNode.update({
      where: { id },
      data: updateData,
    });
  }

  async removeNode(id: string, organizationId: string) {
    const node = await this.prisma.canvasNode.findFirst({
      where: {
        id,
        canvas: {
          project: {
            organizationId,
          },
        },
      },
    });

    if (!node) {
      throw new NotFoundException('Node not found');
    }

    await this.prisma.canvasNode.delete({
      where: { id },
    });

    return { message: 'Node deleted successfully' };
  }

  // Canvas Edges
  async createEdge(createEdgeDto: CreateCanvasEdgeDto, organizationId: string) {
    const canvas = await this.prisma.canvas.findFirst({
      where: {
        id: createEdgeDto.canvasId,
        project: {
          organizationId,
        },
      },
    });

    if (!canvas) {
      throw new NotFoundException('Canvas not found');
    }

    return this.prisma.canvasEdge.create({
      data: createEdgeDto,
      include: {
        source: true,
        target: true,
      },
    });
  }

  async removeEdge(id: string, organizationId: string) {
    const edge = await this.prisma.canvasEdge.findFirst({
      where: {
        id,
        canvas: {
          project: {
            organizationId,
          },
        },
      },
    });

    if (!edge) {
      throw new NotFoundException('Edge not found');
    }

    await this.prisma.canvasEdge.delete({
      where: { id },
    });

    return { message: 'Edge deleted successfully' };
  }
}
