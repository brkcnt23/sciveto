// Database cleanup script - Keep only main categories
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🧹 Starting categories cleanup...')
    
    // Get organization
    const org = await prisma.organization.findFirst()
    if (!org) {
      console.log('No organization found')
      return
    }
    
    console.log('Organization:', org.name)
    
    // Main categories to keep
    const keepCategories = ['Halat', 'Membran', 'Plaka', 'Profil', 'Özel Aksesuarlar']
    
    // Get all categories
    const allCategories = await prisma.category.findMany({
      where: { organizationId: org.id }
    })
    
    console.log(`Found ${allCategories.length} categories`)
    
    // Find categories to delete (not in keep list and have duplicate names)
    const categoriesToDelete = allCategories.filter(cat => {
      // Keep exact matches from our main list
      if (keepCategories.includes(cat.name)) {
        return false
      }
      
      // Delete anything with parentheses (duplicates like "Membran (123456)")
      if (cat.name.includes('(') && cat.name.includes(')')) {
        return true
      }
      
      // Delete if not in our main list
      return !keepCategories.some(keepName => cat.name === keepName)
    })
    
    console.log(`Categories to delete: ${categoriesToDelete.length}`)
    categoriesToDelete.forEach(cat => {
      console.log(`  - ${cat.name} (${cat.id})`)
    })
    
    // Delete categories
    for (const cat of categoriesToDelete) {
      console.log(`Deleting: ${cat.name}`)
      await prisma.category.delete({
        where: { id: cat.id }
      })
    }
    
    // Get remaining categories
    const remainingCategories = await prisma.category.findMany({
      where: { organizationId: org.id },
      include: {
        _count: {
          select: { stockItems: true }
        }
      }
    })
    
    console.log(`\n✅ Cleanup completed. Remaining categories: ${remainingCategories.length}`)
    remainingCategories.forEach(cat => {
      console.log(`  - ${cat.name} (${cat._count.stockItems} items)`)
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
