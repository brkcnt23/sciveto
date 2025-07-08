// apps/api/src/modules/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    console.log('JWT Strategy - Validating payload:', { 
      sub: payload.sub, 
      email: payload.email,
      organizationId: payload.organizationId 
    });

    try {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
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

      if (!user) {
        console.log('JWT Strategy - User not found for ID:', payload.sub);
        throw new UnauthorizedException('User not found');
      }

      console.log('JWT Strategy - User validated successfully:', { 
        userId: user.id, 
        email: user.email,
        organizationId: user.organizationId 
      });

      return user;
    } catch (error) {
      console.error('JWT Strategy - Validation error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}