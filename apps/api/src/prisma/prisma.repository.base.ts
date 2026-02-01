import { PrismaService } from './prisma.service';

type PrismaDelegate = {
  findMany: (args: any) => Promise<any>;
  findFirst: (args: any) => Promise<any>;
  count: (args: any) => Promise<any>;
  create: (args: any) => Promise<any>;
  updateMany: (args: any) => Promise<any>;
  deleteMany: (args: any) => Promise<any>;
};

export class PrismaTenantRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly model: keyof PrismaService,
    private readonly organizationId: string,
  ) {}

  private get delegate(): PrismaDelegate {
    return (this.prisma as any)[this.model];
  }

  private withOrganization(where: Record<string, any> = {}) {
    return {
      ...where,
      organizationId: this.organizationId,
    };
  }

  findMany(args: any = {}) {
    return this.delegate.findMany({
      ...args,
      where: this.withOrganization(args.where),
    });
  }

  findFirst(args: any = {}) {
    return this.delegate.findFirst({
      ...args,
      where: this.withOrganization(args.where),
    });
  }

  count(args: any = {}) {
    return this.delegate.count({
      ...args,
      where: this.withOrganization(args.where),
    });
  }

  create(args: any) {
    return this.delegate.create({
      ...args,
      data: {
        ...args.data,
        organizationId: this.organizationId,
      },
    });
  }

  updateMany(args: any) {
    return this.delegate.updateMany({
      ...args,
      where: this.withOrganization(args.where),
    });
  }

  deleteMany(args: any) {
    return this.delegate.deleteMany({
      ...args,
      where: this.withOrganization(args.where),
    });
  }
}
