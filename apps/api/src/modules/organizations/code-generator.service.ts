import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Service for generating sequential codes for organizations, employees, and projects.
 * 
 * Code Formats:
 * - Organization: ORG-001, ORG-002, ... ORG-999, ORG-1000, etc.
 * - Employee: EMP-001, EMP-002, ... (per organization)
 * - Project: PRJ-2026-001, PRJ-2026-002, ... (per organization, per year)
 */
@Injectable()
export class CodeGeneratorService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Generate unique organization code (ORG-001 format)
   * Global sequential across all organizations
   */
  async generateOrgCode(): Promise<string> {
    const lastOrg = await this.prisma.organization.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { code: true },
    });

    if (!lastOrg || !lastOrg.code) {
      return 'ORG-001';
    }

    const lastNumber = parseInt(lastOrg.code.split('-')[1], 10);
    const nextNumber = lastNumber + 1;
    
    // Pad to at least 3 digits, but allow growth beyond 999
    const padLength = Math.max(3, String(nextNumber).length);
    return `ORG-${String(nextNumber).padStart(padLength, '0')}`;
  }

  /**
   * Generate unique employee code (EMP-001 format)
   * Sequential per organization
   */
  async generateEmployeeCode(organizationId: string): Promise<string> {
    const lastEmployee = await this.prisma.employee.findFirst({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      select: { code: true },
    });

    if (!lastEmployee || !lastEmployee.code) {
      return 'EMP-001';
    }

    const lastNumber = parseInt(lastEmployee.code.split('-')[1], 10);
    const nextNumber = lastNumber + 1;
    
    const padLength = Math.max(3, String(nextNumber).length);
    return `EMP-${String(nextNumber).padStart(padLength, '0')}`;
  }

  /**
   * Generate unique project code (PRJ-2026-001 format)
   * Sequential per organization, per year
   */
  async generateProjectCode(organizationId: string): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `PRJ-${year}-`;

    const lastProject = await this.prisma.project.findFirst({
      where: {
        organizationId,
        code: { startsWith: prefix },
      },
      orderBy: { createdAt: 'desc' },
      select: { code: true },
    });

    if (!lastProject || !lastProject.code) {
      return `${prefix}001`;
    }

    // Extract the sequence number (last part after the year)
    const parts = lastProject.code.split('-');
    const lastNumber = parseInt(parts[2], 10);
    const nextNumber = lastNumber + 1;
    
    const padLength = Math.max(3, String(nextNumber).length);
    return `${prefix}${String(nextNumber).padStart(padLength, '0')}`;
  }

  /**
   * Generate subdomain from organization name
   * Converts "Compro Metal Sanayi" to "compro-metal-sanayi"
   */
  generateSubdomain(orgName: string): string {
    const base = orgName
      .toLowerCase()
      .trim()
      // Turkish character replacements
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      // Replace spaces and special chars with hyphen
      .replace(/[^a-z0-9]+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '');
    
    // Add timestamp to ensure uniqueness
    return `${base}-${Date.now()}`;
  }

  /**
   * Validate if an organization name is available
   */
  async isOrgNameAvailable(name: string): Promise<boolean> {
    const existing = await this.prisma.organization.findUnique({
      where: { name: name.trim() },
      select: { id: true },
    });
    return !existing;
  }

  /**
   * Validate if a tax ID is available
   */
  async isTaxIdAvailable(taxId: string): Promise<boolean> {
    const existing = await this.prisma.organization.findUnique({
      where: { taxId },
      select: { id: true },
    });
    return !existing;
  }
}
