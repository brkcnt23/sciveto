// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTagDto, UpdateTagDto } from './dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto, organizationId: string) {
    return this.prisma.tag.create({
      data: {
        ...createTagDto,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string) {
    return this.prisma.tag.findMany({
      where: {
        organizationId,
      },
      include: {
        _count: {
          select: {
            cards: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string, organizationId: string) {
    const tag = await this.prisma.tag.findFirst({
      where: {
        id,
        organizationId,
      },
      include: {
        cards: {
          include: {
            card: {
              include: {
                project: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto, organizationId: string) {
    const tag = await this.prisma.tag.findFirst({
      where: {
        id,
        organizationId,
      },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return this.prisma.tag.update({
      where: { id },
      data: updateTagDto,
    });
  }

  async remove(id: string, organizationId: string) {
    const tag = await this.prisma.tag.findFirst({
      where: {
        id,
        organizationId,
      },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    await this.prisma.tag.delete({
      where: { id },
    });

    return { message: 'Tag deleted successfully' };
  }

  async addTagToCard(cardId: string, tagId: string, organizationId: string) {
    // Verify tag belongs to organization
    const tag = await this.prisma.tag.findFirst({
      where: {
        id: tagId,
        organizationId,
      },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    // Verify card belongs to organization
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

    return this.prisma.cardTag.create({
      data: {
        cardId,
        tagId,
      },
      include: {
        tag: true,
      },
    });
  }

  async removeTagFromCard(cardId: string, tagId: string, organizationId: string) {
    const cardTag = await this.prisma.cardTag.findFirst({
      where: {
        cardId,
        tagId,
        card: {
          project: {
            organizationId,
          },
        },
      },
    });

    if (!cardTag) {
      throw new NotFoundException('Tag association not found');
    }

    await this.prisma.cardTag.delete({
      where: {
        id: cardTag.id,
      },
    });

    return { message: 'Tag removed from card successfully' };
  }
}
