/**
 * User Role Enum - Matches Prisma schema
 */
export enum UserRole {
  ORGANIZATION_OWNER = 'ORGANIZATION_OWNER',
  PROCUREMENT_MANAGER = 'PROCUREMENT_MANAGER',
  ACCOUNTANT = 'ACCOUNTANT',
  PRODUCTION_MANAGER = 'PRODUCTION_MANAGER',
  HR_MANAGER = 'HR_MANAGER',
  WAREHOUSE_SUPERVISOR = 'WAREHOUSE_SUPERVISOR',
  PRODUCTION_SUPERVISOR = 'PRODUCTION_SUPERVISOR',
}

/**
 * Organization Subscription Plan
 */
export enum SubscriptionPlan {
  TRIAL = 'TRIAL',
  BASIC = 'BASIC',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
}

/**
 * Organization Status
 */
export enum OrgStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  TRIAL = 'TRIAL',
  EXPIRED = 'EXPIRED',
}

/**
 * Organization Interface
 */
export interface IOrganization {
  id: string;
  code: string;
  name: string;
  legalName?: string | null;
  taxId?: string | null;
  subdomain: string;
  domain?: string | null;
  plan: SubscriptionPlan;
  maxUsers: number;
  maxProjects: number;
  userCount: number;
  projectCount: number;
  employeeCount: number;
  status: OrgStatus;
  settings?: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User Interface
 */
export interface IUser {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: UserRole;
  position?: string | null;
  phone?: string | null;
  avatar?: string | null;
  isActive: boolean;
  isOnline: boolean;
  lastLoginAt?: Date | null;
  organizationId: string;
  organization?: IOrganization;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Employee Interface (Factory workers - no login)
 */
export interface IEmployee {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  position: string;
  department?: string | null;
  hireDate: Date;
  terminationDate?: Date | null;
  salary?: number | null;
  insuranceStatus: boolean;
  insuranceDate?: Date | null;
  isActive: boolean;
  organizationId: string;
  organization?: IOrganization;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User Role Labels (Turkish)
 */
export const UserRoleLabels: Record<UserRole, string> = {
  [UserRole.ORGANIZATION_OWNER]: 'Yönetici',
  [UserRole.PROCUREMENT_MANAGER]: 'Satın Alma Sorumlusu',
  [UserRole.ACCOUNTANT]: 'Muhasebeci',
  [UserRole.PRODUCTION_MANAGER]: 'Üretim Mühendisi',
  [UserRole.HR_MANAGER]: 'Personel Sorumlusu',
  [UserRole.WAREHOUSE_SUPERVISOR]: 'Depo Sorumlusu',
  [UserRole.PRODUCTION_SUPERVISOR]: 'İmalat Şefi',
};

/**
 * User Role Descriptions (Turkish)
 */
export const UserRoleDescriptions: Record<UserRole, string> = {
  [UserRole.ORGANIZATION_OWNER]: 'Tam yetkili yönetici - Tüm ekranlara erişim',
  [UserRole.PROCUREMENT_MANAGER]: 'Tedarikçiler, satın alma siparişleri, stok görüntüleme',
  [UserRole.ACCOUNTANT]: 'Faturalar, gelir-gider, maaş ödemeleri, raporlar',
  [UserRole.PRODUCTION_MANAGER]: 'Projeler, iş atamaları, çalışan performansı',
  [UserRole.HR_MANAGER]: 'Çalışanlar, izinler, sigorta, maaşlar, görevlendirme',
  [UserRole.WAREHOUSE_SUPERVISOR]: 'Depo, stok giriş/çıkış, mal kabul',
  [UserRole.PRODUCTION_SUPERVISOR]: 'Atanan projeler, iş girişi, tamamlama',
};

/**
 * Check if user has a specific role or higher
 */
export const hasRole = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roleHierarchy: UserRole[] = [
    UserRole.PRODUCTION_SUPERVISOR,
    UserRole.WAREHOUSE_SUPERVISOR,
    UserRole.HR_MANAGER,
    UserRole.ACCOUNTANT,
    UserRole.PROCUREMENT_MANAGER,
    UserRole.PRODUCTION_MANAGER,
    UserRole.ORGANIZATION_OWNER,
  ];
  
  const userIndex = roleHierarchy.indexOf(userRole);
  const requiredIndex = roleHierarchy.indexOf(requiredRole);
  
  return userIndex >= requiredIndex;
};

/**
 * Get full name from user or employee
 */
export const getFullName = (entity: { firstName?: string | null; lastName?: string | null }): string => {
  const parts = [entity.firstName, entity.lastName].filter(Boolean);
  return parts.join(' ') || 'İsimsiz';
};
