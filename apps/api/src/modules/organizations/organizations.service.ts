import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Organization, Prisma } from '@prisma/client';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    subdomain: string;
    settings?: Record<string, any>;
  }): Promise<Organization> {
    try {
      return await this.prisma.organization.create({
        data: {
          name: data.name,
          subdomain: data.subdomain,
          settings: data.settings || {},
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Organization with this subdomain already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Organization[]> {
    return this.prisma.organization.findMany({
      include: {
        _count: {
          select: {
            users: true,
            categories: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Organization> {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            users: true,
            categories: true,
          },
        },
      },
    });

    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    return organization;
  }

  async findBySubdomain(subdomain: string): Promise<Organization | null> {
    return this.prisma.organization.findUnique({
      where: { subdomain },
    });
  }

  async update(
    id: string,
    data: Partial<{ name: string; settings: Record<string, any> }>
  ): Promise<Organization> {
    await this.findOne(id);

    return this.prisma.organization.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Organization> {
    await this.findOne(id);

    return this.prisma.organization.delete({
      where: { id },
    });
  }

  async getOrCreateDefault(): Promise<Organization> {
    let org = await this.findBySubdomain('default');

    if (!org) {
      org = await this.create({
        name: 'Default Organization',
        subdomain: 'default',
      });
    }

    return org;
  }
}
