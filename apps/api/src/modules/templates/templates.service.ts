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
    const template = await this.findOne(dto.templateId);
    
    if (!template) {
      return {
        success: false,
        message: 'Template not found'
      };
    }

    const category = await this.prisma.category.create({
      data: {
        name: dto.categoryName,
        description: dto.description || template.description,
        organizationId: dto.organizationId,
        templateId: template.id
      }
    });

    return {
      success: true,
      categoryId: category.id,
      message: `Category created from template: ${template.name}`
    };
  }
}
