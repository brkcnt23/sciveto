import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: { email: string; password: string }) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    return { id: user.id, email: user.email };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ 
      where: { id },
      select: { id: true, email: true, role: true, createdAt: true, updatedAt: true }
    });
  }
}