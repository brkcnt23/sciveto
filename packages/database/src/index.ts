// Export the Prisma client and all generated types
export * from '@prisma/client'
export { PrismaClient } from '@prisma/client'

// Explicitly re-export the types to ensure they're available
// This will work after prisma generate is run
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

// Export Prisma utility types
export type {
  Prisma
} from '@prisma/client'