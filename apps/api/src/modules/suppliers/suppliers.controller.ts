import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

class CreateSupplierDto {
  name: string
  contactPerson?: string
  email?: string
  phone?: string
  address?: string
  taxId?: string
  rating?: number
  notes?: string
}

@Controller('suppliers')
@UseGuards(JwtAuthGuard)
export class SuppliersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAll(@Request() req) {
    const suppliers = await this.prisma.supplier.findMany({
      where: { organizationId: req.user.organizationId },
      include: { _count: { select: { items: true } } },
      orderBy: { name: 'asc' },
    })
    return { data: suppliers }
  }

  @Post()
  async create(@Request() req, @Body() dto: CreateSupplierDto) {
    const count = await this.prisma.supplier.count({ where: { organizationId: req.user.organizationId } })
    const code = `SUP-${String(count + 1).padStart(3, '0')}`

    const supplier = await this.prisma.supplier.create({ data: { ...dto, code, organizationId: req.user.organizationId } })
    return { data: supplier }
  }
}
