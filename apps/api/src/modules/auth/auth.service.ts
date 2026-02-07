// @ts-nocheck
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { CodeGeneratorService } from '../organizations/code-generator.service';
import { RegisterDto, LoginDto } from '@sciveto/shared-types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private codeGenerator: CodeGeneratorService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, organizationName, industry } = registerDto;
    
    console.log('🔐 Register attempt:', { email, firstName, lastName, organizationName, industry });
    
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Bu e-posta adresi zaten kullanılıyor');
    }

    // Check if organization name is unique (if provided)
    if (organizationName && organizationName.trim()) {
      const existingOrg = await this.prisma.organization.findUnique({
        where: { name: organizationName.trim() },
      });
      
      if (existingOrg) {
        throw new ConflictException('Bu organizasyon adı zaten kullanılıyor');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get or create organization
    let organization;
    let isNewOrg = false;
    
    if (organizationName && organizationName.trim()) {
      // Generate organization code and subdomain
      const orgCode = await this.codeGenerator.generateOrgCode(organizationName.trim());
      const subdomain = this.codeGenerator.generateSubdomain(organizationName);
      
      // Create new organization with code
      organization = await this.prisma.organization.create({
        data: {
          name: organizationName.trim(),
          code: orgCode,
          subdomain: subdomain,
          plan: 'BASIC',
          maxUsers: 10,
          maxProjects: 50,
          userCount: 1,
          projectCount: 0,
          employeeCount: 0,
          status: 'ACTIVE',
          settings: { industry: industry || 'general' },
        },
      });
      isNewOrg = true;
      console.log('✅ Created new organization:', organization.name, `(${organization.code})`);
    } else {
      // Use or create default organization
      organization = await this.prisma.organization.findFirst({
        where: { subdomain: 'default' },
      });

      if (!organization) {
        const orgCode = await this.codeGenerator.generateOrgCode('Default Organization');
        organization = await this.prisma.organization.create({
          data: {
            name: 'Default Organization',
            code: orgCode,
            subdomain: 'default',
            plan: 'BASIC',
            maxUsers: 10,
            maxProjects: 50,
            userCount: 1,
            status: 'ACTIVE',
          },
        });
        isNewOrg = true;
        console.log('✅ Created default organization');
      } else {
        // Increment user count for existing org
        await this.prisma.organization.update({
          where: { id: organization.id },
          data: { userCount: { increment: 1 } },
        });
      }
    }

    // Create categories from templates if new organization
    if (isNewOrg) {
      await this.createCategoriesForIndustry(organization.id, industry || 'general');
    }

    // Create user - ORGANIZATION_OWNER if they created the org, otherwise lower role
    const userRole = isNewOrg ? 'ORGANIZATION_OWNER' : 'PRODUCTION_SUPERVISOR';
    
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: firstName || null,
        lastName: lastName || null,
        organizationId: organization.id,
        role: userRole,
        isActive: true,
        isOnline: true,
        lastLoginAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        isOnline: true,
        organizationId: true,
        createdAt: true,
        organization: {
          select: {
            id: true,
            name: true,
            code: true,
            subdomain: true,
            plan: true,
            maxUsers: true,
            userCount: true,
          },
        },
      },
    });
    
    console.log('✅ User created:', user.email, `Role: ${user.role}`, 'Organization:', user.organization?.name);

    // Generate JWT token
    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role,
      organizationId: user.organizationId 
    };
    const token = this.jwtService.sign(payload);

    return {
      user,
      access_token: token,
    };
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role,
      organizationId: user.organizationId 
    };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            subdomain: true,
          },
        },
      },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        organizationId: true,
        createdAt: true,
        updatedAt: true,
        organization: {
          select: {
            id: true,
            name: true,
            subdomain: true,
          },
        },
      },
    });
  }

  async getProfile(userId: string) {
    return this.findById(userId);
  }

  /**
   * Creates categories from system templates based on industry
   */
  private async createCategoriesForIndustry(organizationId: string, industry: string) {
    console.log(`📦 Creating categories for industry: ${industry}`);
    
    // Industry template mapping
    const industryTemplates: Record<string, string[]> = {
      'steel-manufacturing': ['Profil', 'Plaka'],
      'tensile-architecture': ['Membran', 'Halat', 'Mapa'],
      'electronics': [], // Will use general
      'general': [],
    };

    const templateNames = industryTemplates[industry] || [];
    
    if (templateNames.length > 0) {
      // Find templates from database
      const templates = await this.prisma.systemCategoryTemplate.findMany({
        where: {
          name: { in: templateNames },
        },
        include: {
          fields: true,
          standards: true,
        },
      });

      // Create categories from templates
      for (const template of templates) {
        const category = await this.prisma.category.create({
          data: {
            name: template.name,
            description: template.description || `${template.name} kategorisi`,
            color: this.getColorForTemplate(template.name),
            organizationId,
            templateId: template.id,
            templateVersion: template.version,
            isSystemBased: true,
            customFields: {
              fields: template.fields,
              standards: template.standards,
            },
          },
        });
        console.log(`✅ Created category from template: ${category.name}`);
      }
    }
    
    // Always add a "Genel" category
    await this.prisma.category.create({
      data: {
        name: 'Genel',
        description: 'Genel stok kategorisi',
        color: '#6B7280',
        organizationId,
        isSystemBased: false,
      },
    });
    console.log('✅ Created default "Genel" category');

    // Seed default stock categories for the organization
    try {
      await this.seedDefaultStockCategories(organizationId);
      console.log('✅ Seeded default stock categories');
    } catch (err) {
      console.error('Failed to seed stock categories:', err);
    }
  }

  private getColorForTemplate(name: string): string {
    const colors: Record<string, string> = {
      'Profil': '#3B82F6',    // Blue
      'Plaka': '#10B981',      // Green
      'Membran': '#8B5CF6',    // Purple
      'Halat': '#F59E0B',      // Amber
      'Mapa': '#EF4444',       // Red
    };
    return colors[name] || '#6B7280';
  }

  /**
   * Seed default StockCategory entries for a new organization
   */
  private async seedDefaultStockCategories(organizationId: string) {
    const defaults = [
      { name: 'Sarf Malzemeler', slug: 'sarf', icon: 'i-lucide-package', color: '#3b82f6' },
      { name: 'Çelik', slug: 'celik', icon: 'i-lucide-hammer', color: '#ef4444' },
      { name: 'Membran', slug: 'membran', icon: 'i-lucide-file-text', color: '#10b981' },
      { name: 'Halat', slug: 'halat', icon: 'i-lucide-link', color: '#f59e0b' },
      { name: 'Fitil', slug: 'fitil', icon: 'i-lucide-scissors', color: '#8b5cf6' },
      { name: 'Genel', slug: 'genel', icon: 'i-lucide-box', color: '#6b7280' },
    ];

    for (const cat of defaults) {
      try {
        await this.prisma.stockCategory.create({
          data: {
            name: cat.name,
            slug: cat.slug,
            icon: cat.icon,
            color: cat.color,
            description: `${cat.name} kategorisi`,
            organizationId,
          },
        });
      } catch (err: any) {
        // ignore unique constraint errors
        if (err.code === 'P2002') continue;
        throw err;
      }
    }
  }
}