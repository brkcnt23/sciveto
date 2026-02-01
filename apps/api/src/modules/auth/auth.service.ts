// @ts-nocheck
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, LoginDto } from '@sciveto/shared-types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, organizationName, industry } = registerDto;
    
    console.log('🔐 Register attempt:', { email, firstName, lastName, organizationName, industry });
    
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get or create organization
    let organization;
    let isNewOrg = false;
    
    if (organizationName && organizationName.trim()) {
      // Create new organization for user
      const subdomain = organizationName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      
      // Check if subdomain exists
      const existingOrg = await this.prisma.organization.findUnique({
        where: { subdomain },
      });
      
      if (existingOrg) {
        organization = existingOrg;
      } else {
        // Create new organization
        organization = await this.prisma.organization.create({
          data: {
            name: organizationName.trim(),
            subdomain: subdomain + '-' + Date.now(),
            settings: { industry: industry || 'general' },
          },
        });
        isNewOrg = true;
        console.log('✅ Created new organization:', organization.name, organization.id);
      }
    } else {
      // Use or create default organization
      organization = await this.prisma.organization.findFirst({
        where: { subdomain: 'default' },
      });

      if (!organization) {
        organization = await this.prisma.organization.create({
          data: {
            name: 'Default Organization',
            subdomain: 'default',
          },
        });
        isNewOrg = true;
        console.log('✅ Created default organization');
      }
    }

    // Create categories from templates if new organization
    if (isNewOrg) {
      await this.createCategoriesForIndustry(organization.id, industry || 'general');
    }

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: firstName || null,
        lastName: lastName || null,
        organizationId: organization.id,
        role: organizationName ? 'ORG_ADMIN' : 'USER', // Organization creator becomes admin
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        organizationId: true,
        createdAt: true,
        organization: {
          select: {
            id: true,
            name: true,
            subdomain: true,
          },
        },
      },
    });
    
    console.log('✅ User created:', user.email, 'Organization:', user.organization?.name);

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
}