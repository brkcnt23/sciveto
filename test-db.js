// Quick database test
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🔍 Checking database...')
    
    // Get organization
    const org = await prisma.organization.findFirst()
    console.log('Organization:', {
      id: org?.id,
      name: org?.name,
      subdomain: org?.subdomain
    })
    
    // Get categories count
    const categoryCount = await prisma.category.count({
      where: { organizationId: org?.id }
    })
    console.log('Categories for org:', categoryCount)
    
    // Get categories
    const categories = await prisma.category.findMany({
      where: { organizationId: org?.id },
      take: 3
    })
    console.log('Sample categories:', categories.map(c => ({ id: c.id, name: c.name, color: c.color })))
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
