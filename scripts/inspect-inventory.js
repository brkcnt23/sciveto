const { PrismaClient } = require('../node_modules/.pnpm/@prisma+client@6.13.0_prism_5976223c52a35cf7e022cc58f6ace504/node_modules/@prisma/client')

;(async () => {
  const prisma = new PrismaClient()
  try {
    const items = await prisma.stockItem.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: { organization: true, category: true, user: true }
    })
    console.log('Recent StockItems:')
    items.forEach(it => {
      console.log({ id: it.id, name: it.name, sku: it.sku, code: it.code, quantity: it.currentStock, unit: it.unit, org: it.organization?.code, category: it.category?.name, createdAt: it.createdAt })
    })
  } catch (e) {
    console.error('Error:', e.message)
  } finally {
    await prisma.$disconnect()
  }
})()
