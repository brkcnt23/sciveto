const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkData() {
  console.log('🔍 Veritabanı kontrol ediliyor...')
  
  // Mapa kategorisi kontrolü
  const mapaCategory = await prisma.category.findFirst({
    where: { name: 'Mapa' }
  })
  console.log('Mapa kategorisi:', mapaCategory)
  
  if (mapaCategory) {
    const stockItems = await prisma.stockItem.findMany({
      where: { categoryId: mapaCategory.id }
    })
    console.log('Mapa kategorisi ürün sayısı:', stockItems.length)
    
    if (stockItems.length > 0) {
      console.log('İlk ürün örneği:', {
        id: stockItems[0].id,
        name: stockItems[0].name,
        categoryId: stockItems[0].categoryId,
        currentStock: stockItems[0].currentStock
      })
    }
  }
  
  // Tüm ürünleri kontrol et
  const allItems = await prisma.stockItem.findMany()
  console.log('Toplam ürün sayısı:', allItems.length)
  
  // Kategoriye göre grup
  const itemsByCategory = await prisma.stockItem.groupBy({
    by: ['categoryId'],
    _count: {
      id: true
    }
  })
  console.log('Kategorilere göre ürün dağılımı:', itemsByCategory)
  
  await prisma.$disconnect()
}

checkData().catch(console.error)
