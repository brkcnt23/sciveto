const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Stok verileri ekleniyor...')

  // Önce mevcut kullanıcıları alalım
  const users = await prisma.user.findMany({
    take: 1 // İlk kullanıcıyı al
  })
  
  if (users.length === 0) {
    console.log('❌ Hiç kullanıcı bulunamadı. Önce kullanıcı oluşturulmalı.')
    return
  }
  
  const defaultUser = users[0]
  console.log('Varsayılan kullanıcı:', { id: defaultUser.id, email: defaultUser.email })

  // Önce mevcut kategorileri alalım
  const categories = await prisma.category.findMany({
    include: {
      organization: true
    }
  })
  console.log('Mevcut kategoriler:', categories.map(c => ({ id: c.id, name: c.name, organizationId: c.organizationId, userId: c.userId })))

  if (categories.length === 0) {
    console.log('❌ Hiç kategori bulunamadı. Önce kategoriler oluşturulmalı.')
    return
  }

  // Her kategori için test verileri
  const stockItemsData = [
    // Mapa kategorisi için
    {
      name: 'A4 Teknik Resim Kağıdı',
      description: 'Yüksek kaliteli teknik çizim kağıdı, 90 gr/m²',
      unit: 'adet',
      currentStock: 500,
      minStockLevel: 100,
      value: 2.50,
      location: 'Depo A - Raf 1',
      specifications: '210x297 mm, 90 gr/m²',
      templateFields: {
        used_project: 'Villa Projesi 2024',
        additional_notes: 'Yeni tedarikçiden alındı'
      },
      standards: {
        'paper_size': 'A4',
        'weight': '90gr'
      }
    },
    {
      name: 'A3 Teknik Resim Kağıdı',
      description: 'Büyük format teknik çizim kağıdı, 90 gr/m²',
      unit: 'adet',
      currentStock: 200,
      minStockLevel: 50,
      value: 4.75,
      location: 'Depo A - Raf 1',
      specifications: '297x420 mm, 90 gr/m²',
      templateFields: {
        used_project: 'Apartman Projesi',
        additional_notes: 'Acil projeler için ayrıldı'
      },
      standards: {
        'paper_size': 'A3',
        'weight': '90gr'
      }
    },
    {
      name: 'A1 Teknik Resim Kağıdı',
      description: 'Büyük boy proje çizimleri için, 90 gr/m²',
      unit: 'adet',
      currentStock: 50,
      minStockLevel: 20,
      value: 12.00,
      location: 'Depo A - Raf 2',
      specifications: '594x841 mm, 90 gr/m²',
      templateFields: {
        used_project: 'İnşaat Projesi 2024',
        additional_notes: 'Büyük projeler için rezerve'
      },
      standards: {
        'paper_size': 'A1',
        'weight': '90gr'
      }
    },
    {
      name: 'Milimetrik Kağıt A4',
      description: '1mm kareli teknik hesaplama kağıdı',
      unit: 'adet',
      currentStock: 300,
      minStockLevel: 75,
      value: 1.25,
      location: 'Depo A - Raf 1',
      specifications: '210x297 mm, 1mm kare',
      templateFields: {
        used_project: 'Hesaplama Çalışmaları',
        additional_notes: 'Öğrenciler için de kullanılıyor'
      },
      standards: {
        'paper_size': 'A4',
        'grid_size': '1mm'
      }
    },
    {
      name: 'Tracing Paper A4',
      description: 'Şeffaf kopya kağıdı, 63 gr/m²',
      unit: 'adet',
      currentStock: 150,
      minStockLevel: 40,
      value: 3.20,
      location: 'Depo B - Raf 3',
      specifications: '210x297 mm, şeffaf',
      templateFields: {
        used_project: 'Revizyon Çalışmaları',
        additional_notes: 'Kaliteli marka tercih edildi'
      },
      standards: {
        'paper_size': 'A4',
        'transparency': 'high'
      }
    },
    // Genel malzemeler için
    {
      name: 'Çelik Levha 2mm',
      description: 'Galvanizli çelik levha, 1000x2000mm',
      unit: 'adet',
      currentStock: 25,
      minStockLevel: 10,
      value: 450.00,
      location: 'Dış Depo',
      specifications: '1000x2000x2mm, galvanizli',
      templateFields: {},
      standards: {
        'thickness': '2mm',
        'coating': 'galvanized'
      }
    },
    {
      name: 'Çelik Levha 3mm',
      description: 'Galvanizli çelik levha, 1000x2000mm',
      unit: 'adet',
      currentStock: 15,
      minStockLevel: 8,
      value: 675.00,
      location: 'Dış Depo',
      specifications: '1000x2000x3mm, galvanizli',
      templateFields: {},
      standards: {
        'thickness': '3mm',
        'coating': 'galvanized'
      }
    },
    {
      name: 'PVC Boru 32mm',
      description: 'Beyaz PVC boru, 3 metre',
      unit: 'adet',
      currentStock: 100,
      minStockLevel: 30,
      value: 25.50,
      location: 'Depo C - Raf 5',
      specifications: 'Ø32mm x 3m, beyaz PVC',
      templateFields: {},
      standards: {
        'diameter': '32mm',
        'material': 'PVC'
      }
    },
    {
      name: 'Elektrik Kablosu 2.5mm²',
      description: 'NYA kablo, tek damarlı, 100m makara',
      unit: 'metre',
      currentStock: 500,
      minStockLevel: 100,
      value: 8.75,
      location: 'Elektrik Deposu',
      specifications: '2.5mm², NYA, tek damar',
      templateFields: {},
      standards: {
        'cross_section': '2.5mm²',
        'type': 'NYA'
      }
    },
    {
      name: 'Vida M8x40',
      description: 'Galvanizli çelik vida, imbus kafası',
      unit: 'adet',
      currentStock: 500,
      minStockLevel: 100,
      value: 1.25,
      location: 'Küçük Parça Deposu',
      specifications: 'M8x40mm, galvanizli, imbus',
      templateFields: {},
      standards: {
        'thread': 'M8',
        'length': '40mm'
      }
    }
  ]

  // Her kategori için ürünler ekle
  for (const category of categories) {
    console.log(`\n📦 ${category.name} kategorisi için ürünler ekleniyor...`)
    
    // Kategori tipine göre uygun ürünleri seç
    let categoryItems = []
    
    if (category.name.toLowerCase().includes('mapa') || category.name.toLowerCase().includes('kağıt')) {
      // Mapa/Kağıt kategorisi için kağıt ürünleri
      categoryItems = stockItemsData.slice(0, 5) // İlk 5 ürün (kağıt ürünleri)
    } else {
      // Diğer kategoriler için genel malzemeler
      categoryItems = stockItemsData.slice(5) // Son 5 ürün (genel malzemeler)
    }

    for (const itemData of categoryItems) {
      try {
        const stockItem = await prisma.stockItem.create({
          data: {
            name: itemData.name,
            description: itemData.description,
            unit: itemData.unit,
            currentStock: itemData.currentStock,
            minStockLevel: itemData.minStockLevel,
            lastPurchasePrice: itemData.value,
            totalValue: itemData.currentStock * itemData.value,
            location: itemData.location,
            categoryId: category.id,
            userId: defaultUser.id,
            organizationId: category.organizationId,
            reservedStock: Math.floor(Math.random() * 10),
            standardValues: itemData.standards,
            customValues: itemData.templateFields,
            specifications: typeof itemData.specifications === 'string' 
              ? { description: itemData.specifications }
              : { description: itemData.specifications || '' }
          }
        })
        
        console.log(`  ✅ ${stockItem.name} eklendi (ID: ${stockItem.id})`)
      } catch (error) {
        console.log(`  ❌ ${itemData.name} eklenirken hata: ${error.message}`)
      }
    }
  }

  console.log('\n🎉 Stok verileri başarıyla eklendi!')
  
  // Özet bilgi
  const totalItems = await prisma.stockItem.count()
  console.log(`📊 Toplam ${totalItems} ürün veritabanında mevcut.`)
}

main()
  .catch((e) => {
    console.error('❌ Hata:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
