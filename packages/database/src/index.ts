export * from '@prisma/client'
export { PrismaClient } from '@prisma/client'

// Re-export all types and enums
export type {
  User,
  Organization,
  Category,
  StockItem,
  Project,
  ProjectAllocation,
  StockTransaction,
  UserRole,
  StockStatus,
  ProjectStatus,
  ProjectPriority,
  AllocationStatus,
  TransactionType
} from '@prisma/client'