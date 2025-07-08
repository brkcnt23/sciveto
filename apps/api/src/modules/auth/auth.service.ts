import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get or create default organization
    let organization = await this.prisma.organization.findFirst({
      where: { subdomain: 'default' },
    });

    if (!organization) {
      organization = await this.prisma.organization.create({
        data: {
          name: 'Default Organization',
          subdomain: 'default',
        },
      });
    }

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        organizationId: organization.id,
        role: 'USER',
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
}