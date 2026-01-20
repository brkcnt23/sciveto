// @ts-nocheck
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCardDto, UpdateCardDto, CreateCardCommentDto } from './dto';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async create(createCardDto: CreateCardDto, userId: string, organizationId: string) {
    // Verify project belongs to organization
    const project = await this.prisma.project.findFirst({
      where: {
        id: createCardDto.projectId,
        organizationId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.prisma.card.create({
      data: {
        ...createCardDto,
        position: createCardDto.position ?? 0,
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
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

    return this.prisma.card.findMany({
      where: {
        projectId,
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: [
        { columnId: 'asc' },
        { position: 'asc' },
      ],
    });
  }

  async findOne(id: string, organizationId: string) {
    const card = await this.prisma.card.findFirst({
      where: {
        id,
        project: {
          organizationId,
        },
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          include: {
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
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    return card;
  }

  async update(id: string, updateCardDto: UpdateCardDto, userId: string, organizationId: string) {
    const card = await this.prisma.card.findFirst({
      where: {
        id,
        project: {
          organizationId,
        },
      },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    return this.prisma.card.update({
      where: { id },
      data: updateCardDto,
      include: {
        assignedTo: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string, organizationId: string) {
    const card = await this.prisma.card.findFirst({
      where: {
        id,
        project: {
          organizationId,
        },
      },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    await this.prisma.card.delete({
      where: { id },
    });

    return { message: 'Card deleted successfully' };
  }

  // Card Comments
  async createComment(createCommentDto: CreateCardCommentDto, userId: string, organizationId: string) {
    const card = await this.prisma.card.findFirst({
      where: {
        id: createCommentDto.cardId,
        project: {
          organizationId,
        },
      },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    return this.prisma.cardComment.create({
      data: {
        content: createCommentDto.content,
        cardId: createCommentDto.cardId,
        userId,
      },
      include: {
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
  }

  async getComments(cardId: string, organizationId: string) {
    const card = await this.prisma.card.findFirst({
      where: {
        id: cardId,
        project: {
          organizationId,
        },
      },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    return this.prisma.cardComment.findMany({
      where: {
        cardId,
      },
      include: {
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

  async updatePositions(updates: Array<{ id: string; position: number; columnId: string }>, organizationId: string) {
    // Verify all cards belong to the organization
    const cardIds = updates.map(u => u.id);
    const cards = await this.prisma.card.findMany({
      where: {
        id: { in: cardIds },
        project: {
          organizationId,
        },
      },
    });

    if (cards.length !== cardIds.length) {
      throw new NotFoundException('One or more cards not found');
    }

    // Update positions in a transaction
    const updatePromises = updates.map(update =>
      this.prisma.card.update({
        where: { id: update.id },
        data: {
          position: update.position,
          columnId: update.columnId,
        },
      })
    );

    await this.prisma.$transaction(updatePromises);

    return { message: 'Card positions updated successfully' };
  }
}
