// @ts-nocheck
// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { 
  TemplateQueryDto, 
  CreateCategoryFromTemplateDto,
  CreateCategoryFromTemplateResponse,
  SystemTemplate,
  TemplateListResponse
} from '@sciveto/shared-types';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: TemplateQueryDto): Promise<any> {
    const { page = 1, limit = 10, search, industry } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } }
        ]
      }),
      ...(industry && { industry })
    };

    const [templates, total] = await Promise.all([
      this.prisma.systemCategoryTemplate.findMany({
        where,
        include: {
          standards: {
            orderBy: { sortOrder: 'asc' }
          },
          fields: {
            orderBy: { sortOrder: 'asc' }
          }
        },
        skip,
        take: limit,
        orderBy: { name: 'asc' }
      }),
      this.prisma.systemCategoryTemplate.count({ where })
    ]);

    return {
      templates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: string): Promise<any> {
    const template = await this.prisma.systemCategoryTemplate.findUnique({
      where: { id },
      include: {
        standards: {
          orderBy: { sortOrder: 'asc' }
        },
        fields: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    return template;
  }

  async getIndustries(): Promise<string[]> {
    const templates = await this.prisma.systemCategoryTemplate.findMany({
      select: { industry: true },
      distinct: ['industry']
    });

    return templates
      .map(t => t.industry)
      .filter((industry): industry is string => industry !== null)
      .sort();
  }

  async createCategoryFromTemplate(dto: CreateCategoryFromTemplateDto): Promise<CreateCategoryFromTemplateResponse> {
    console.log('Service - received DTO:', dto);
    console.log('DTO organizationId type:', typeof dto.organizationId);
    console.log('DTO organizationId value:', dto.organizationId);
    
    const template = await this.findOne(dto.templateId);
    console.log('Template found:', template ? template.name : 'NOT FOUND');
    
    if (!template) {
      return {
        success: false,
        message: 'Template not found'
      };
    }

    // TODO: Get organizationId from auth context in production
    const organizationId = dto.organizationId || 'cmdx0yamq0000e4kwlmpedajf';
    console.log('Final organizationId:', organizationId);
    console.log('Final organizationId type:', typeof organizationId);

    try {
      // Check if category with same name already exists
      const existingCategory = await this.prisma.category.findFirst({
        where: {
          name: dto.categoryName,
          organizationId: organizationId
        }
      });

      let categoryName = dto.categoryName;
      if (existingCategory) {
        // Add timestamp to make name unique
        const timestamp = new Date().toISOString().slice(11, 19).replace(/:/g, '');
        categoryName = `${dto.categoryName} (${timestamp})`;
      }

      const categoryData = {
        name: categoryName,
        description: dto.description || template.description,
        color: dto.color || '#3B82F6',
        organizationId: organizationId,
        templateId: template.id,
        templateVersion: template.version,
        isSystemBased: true
      };
      
      console.log('Category data to create:', categoryData);
      
      const category = await this.prisma.category.create({
        data: categoryData
      });

      console.log('Category created:', category);

      return {
        success: true,
        categoryId: category.id,
        message: `Category "${category.name}" created successfully from template "${template.name}"`
      };
    } catch (error) {
      console.error('Prisma create error:', error);
      
      // Handle unique constraint error specifically
      if (error.code === 'P2002') {
        return {
          success: false,
          message: `Category "${dto.categoryName}" already exists. Please choose a different name.`
        };
      }
      
      throw error;
    }
  }
}
