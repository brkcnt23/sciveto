// prisma/seed.ts - Database Seeding for Sciveto
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // 1. Create Organization
  const organization = await prisma.organization.upsert({
    where: { subdomain: 'demo' },
    update: {},
    create: {
      name: 'Demo Şirketi',
      subdomain: 'demo',
      domain: 'demo.sciveto.com',
      settings: {
        currency: 'TRY',
        timezone: 'Europe/Istanbul',
        language: 'tr'
      }
    }
  })
  
  console.log('✅ Organization created:', organization.name)
  console.log('📋 Organization ID:', organization.id)

  // 2. Create User
  const user = await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      password: '$2b$10$K7L/VGGykHT9TiKqRlwBAepEBV1CHTCWVBm2LLLQPEDovV.2pJGOS', // "password123"
      firstName: 'Admin',
      lastName: 'User',
      role: 'ORG_ADMIN',
      organizationId: organization.id
    }
  })
  
  console.log('✅ User created:', user.email)

  // 3. Create System Category Templates
  const profilTemplate = await prisma.systemCategoryTemplate.upsert({
    where: { 
      name_version: {
        name: 'Profil',
        version: '1.0'
      }
    },
    update: {},
    create: {
      name: 'Profil',
      version: '1.0',
      isLatest: true,
      description: 'HEA, HEB, IPE serisi yapısal profiller',
      industry: 'steel-manufacturing',
      icon: 'i-lucide-box',
      changelog: 'İlk sürüm - 15 standart profil tipi'
    }
  })

  const plakaTemplate = await prisma.systemCategoryTemplate.upsert({
    where: { 
      name_version: {
        name: 'Plaka',
        version: '1.0'
      }
    },
    update: {},
    create: {
      name: 'Plaka',
      version: '1.0',
      isLatest: true,
      description: 'S235, S355, paslanmaz çelik plakalar',
      industry: 'steel-manufacturing',
      icon: 'i-lucide-square',
      changelog: 'İlk sürüm - 10 malzeme standardı'
    }
  })

  const halatTemplate = await prisma.systemCategoryTemplate.upsert({
    where: { 
      name_version: {
        name: 'Halat',
        version: '1.0'
      }
    },
    update: {},
    create: {
      name: 'Halat',
      version: '1.0',
      isLatest: true,
      description: 'Çelik halat, paslanmaz halat, galvanizli halat',
      industry: 'tensile-architecture',
      icon: 'i-lucide-git-branch',
      changelog: 'İlk sürüm - 8 halat konstruksiyonu'
    }
  })

  const membranTemplate = await prisma.systemCategoryTemplate.upsert({
    where: { 
      name_version: {
        name: 'Membran',
        version: '1.0'
      }
    },
    update: {},
    create: {
      name: 'Membran',
      version: '1.0',
      isLatest: true,
      description: 'Tensile membran kumaşları - Malzeme türü ve özellik bazlı',
      industry: 'tensile-architecture',
      icon: 'i-lucide-layers',
      changelog: 'İlk sürüm - Membran malzeme türleri ve yangın standartları'
    }
  })

  const mapaTemplate = await prisma.systemCategoryTemplate.upsert({
    where: { 
      name_version: {
        name: 'Mapa',
        version: '1.0'
      }
    },
    update: {},
    create: {
      name: 'Mapa',
      version: '1.0',
      isLatest: true,
      description: 'Halat ucu mapası, germe mapası ve mapa aksesuarları',
      industry: 'rigging-hardware',
      icon: 'i-lucide-link',
      changelog: 'İlk sürüm - Mapa türleri ve ölçü standartları'
    }
  })

  console.log('✅ Templates created')

  // 4. Add Template Standards
  await prisma.templateStandard.createMany({
    data: [
      // Profil Standards
      { templateId: profilTemplate.id, name: 'HEA', value: 'HEA', category: 'profile_type', sortOrder: 1 },
      { templateId: profilTemplate.id, name: 'HEB', value: 'HEB', category: 'profile_type', sortOrder: 2 },
      { templateId: profilTemplate.id, name: 'IPE', value: 'IPE', category: 'profile_type', sortOrder: 3 },
      { templateId: profilTemplate.id, name: 'UPN', value: 'UPN', category: 'profile_type', sortOrder: 4 },
      { templateId: profilTemplate.id, name: 'S235JR', value: 'S235JR', category: 'material', sortOrder: 1 },
      { templateId: profilTemplate.id, name: 'S355JR', value: 'S355JR', category: 'material', sortOrder: 2 },
      
      // Plaka Standards
      { templateId: plakaTemplate.id, name: 'S235JR', value: 'S235JR', category: 'material', sortOrder: 1 },
      { templateId: plakaTemplate.id, name: 'S355JR', value: 'S355JR', category: 'material', sortOrder: 2 },
      { templateId: plakaTemplate.id, name: 'AISI 304', value: 'AISI_304', category: 'material', sortOrder: 3 },
      { templateId: plakaTemplate.id, name: 'AISI 316', value: 'AISI_316', category: 'material', sortOrder: 4 },
      
      // Halat Standards
      { templateId: halatTemplate.id, name: '6x19 FC', value: '6x19_FC', category: 'construction', sortOrder: 1 },
      { templateId: halatTemplate.id, name: '6x37 FC', value: '6x37_FC', category: 'construction', sortOrder: 2 },
      { templateId: halatTemplate.id, name: '7x7', value: '7x7', category: 'construction', sortOrder: 3 },
      { templateId: halatTemplate.id, name: '1x19', value: '1x19', category: 'construction', sortOrder: 4 },
      
      // Mapa Standards
      { templateId: mapaTemplate.id, name: 'Halat Ucu Mapası', value: 'HALAT_UCU_MAPASI', category: 'type', sortOrder: 1 },
      { templateId: mapaTemplate.id, name: 'Halat Ucu Çatalı', value: 'HALAT_UCU_CATALI', category: 'type', sortOrder: 2 },
      { templateId: mapaTemplate.id, name: 'Asma Germe Galvaniz', value: 'ASMA_GERME_GALVANIZ', category: 'type', sortOrder: 3 },
      { templateId: mapaTemplate.id, name: 'Boru Tip Germe', value: 'BORU_TIP_GERDIRME', category: 'type', sortOrder: 4 },
      { templateId: mapaTemplate.id, name: 'Galvanizli', value: 'GALVANIZED', category: 'coating', sortOrder: 1 },
      { templateId: mapaTemplate.id, name: 'Paslanmaz', value: 'STAINLESS', category: 'coating', sortOrder: 2 },
      { templateId: mapaTemplate.id, name: 'Ham Çelik', value: 'RAW_STEEL', category: 'coating', sortOrder: 3 }
    ]
  })

  // 5. Add Template Fields
  await prisma.templateField.createMany({
    data: [
      // Profil Fields
      { templateId: profilTemplate.id, name: 'profile_type', label: 'Profil Tipi', type: 'select', required: true, sortOrder: 1 },
      { templateId: profilTemplate.id, name: 'size', label: 'Boyut', type: 'text', required: true, sortOrder: 2 },
      { templateId: profilTemplate.id, name: 'length_mm', label: 'Uzunluk (mm)', type: 'number', unit: 'mm', sortOrder: 3 },
      { templateId: profilTemplate.id, name: 'material', label: 'Malzeme', type: 'select', required: true, sortOrder: 4 },
      { templateId: profilTemplate.id, name: 'weight_kg_m', label: 'Ağırlık (kg/m)', type: 'number', unit: 'kg/m', sortOrder: 5 },
      
      // Plaka Fields
      { templateId: plakaTemplate.id, name: 'material', label: 'Malzeme', type: 'select', required: true, sortOrder: 1 },
      { templateId: plakaTemplate.id, name: 'thickness_mm', label: 'Kalınlık (mm)', type: 'number', unit: 'mm', required: true, sortOrder: 2 },
      { templateId: plakaTemplate.id, name: 'width_mm', label: 'Genişlik (mm)', type: 'number', unit: 'mm', sortOrder: 3 },
      { templateId: plakaTemplate.id, name: 'length_mm', label: 'Uzunluk (mm)', type: 'number', unit: 'mm', sortOrder: 4 },
      { templateId: plakaTemplate.id, name: 'surface_treatment', label: 'Yüzey İşlemi', type: 'text', sortOrder: 5 },
      
      // Halat Fields
      { templateId: halatTemplate.id, name: 'construction', label: 'Konstruksiyon', type: 'select', required: true, sortOrder: 1 },
      { templateId: halatTemplate.id, name: 'diameter_mm', label: 'Çap (mm)', type: 'number', unit: 'mm', required: true, sortOrder: 2 },
      { templateId: halatTemplate.id, name: 'breaking_load_kg', label: 'Kırılma Yükü (kg)', type: 'number', unit: 'kg', sortOrder: 3 },
      { templateId: halatTemplate.id, name: 'coating', label: 'Kaplama', type: 'select', sortOrder: 4 },
      { templateId: halatTemplate.id, name: 'length_m', label: 'Uzunluk (m)', type: 'number', unit: 'm', sortOrder: 5 }
    ]
  })

  console.log('✅ Template standards and fields created')

  // Clear existing categories first
  await prisma.category.deleteMany({
    where: { organizationId: organization.id }
  })
  console.log('🧹 Cleared existing categories')

  // 6. Create Categories from Templates
  const profilCategory = await prisma.category.create({
    data: {
      name: 'Profil',
      description: 'HEA, HEB, IPE serisi yapısal profiller',
      color: '#3B82F6',
      icon: 'i-lucide-box',
      organizationId: organization.id,
      templateId: profilTemplate.id,
      templateVersion: '1.0',
      isSystemBased: true
    }
  })

  const plakaCategory = await prisma.category.create({
    data: {
      name: 'Plaka',
      description: 'S235, S355, paslanmaz çelik plakalar',
      color: '#10B981',
      icon: 'i-lucide-square',
      organizationId: organization.id,
      templateId: plakaTemplate.id,
      templateVersion: '1.0',
      isSystemBased: true
    }
  })

  const halatCategory = await prisma.category.create({
    data: {
      name: 'Halat',
      description: 'Çelik halat, paslanmaz halat, galvanizli halat',
      color: '#F59E0B',
      icon: 'i-lucide-git-branch',
      organizationId: organization.id,
      templateId: halatTemplate.id,
      templateVersion: '1.0',
      isSystemBased: true
    }
  })

  const membranCategory = await prisma.category.create({
    data: {
      name: 'Membran',
      description: 'Tensile membran kumaşları - PVC, PTFE, ETFE türleri',
      color: '#EC4899',
      icon: 'i-lucide-layers',
      organizationId: organization.id,
      templateId: membranTemplate.id,
      templateVersion: '1.0',
      isSystemBased: true
    }
  })

  const mapaCategory = await prisma.category.create({
    data: {
      name: 'Mapa',
      description: 'Halat ucu mapaları, germe mapaları ve mapa aksesuarları',
      color: '#F97316',
      icon: 'i-lucide-link',
      organizationId: organization.id,
      templateId: mapaTemplate.id,
      templateVersion: '1.0',
      isSystemBased: true
    }
  })

  // Manuel kategori örneği
  const customCategory = await prisma.category.create({
    data: {
      name: 'Özel Aksesuarlar',
      description: 'Firmaya özel üretim aksesuarları',
      color: '#8B5CF6',
      icon: 'i-lucide-wrench',
      organizationId: organization.id,
      isSystemBased: false,
      customFields: {
        fields: [
          { name: 'part_number', label: 'Parça No', type: 'text', required: true },
          { name: 'client', label: 'Müşteri', type: 'text' },
          { name: 'specifications', label: 'Özellikler', type: 'textarea' }
        ]
      }
    }
  })

  console.log('✅ Categories created')

  // 7. Create Sample Stock Items
  await prisma.stockItem.createMany({
    data: [
      // Profil items
      {
        name: 'HEA 100',
        description: 'HEA 100 yapısal profil, 6m uzunluk',
        sku: 'PRF-HEA-100-6000',
        unit: 'adet',
        currentStock: 25,
        minStockLevel: 5,
        maxStockLevel: 100,
        lastPurchasePrice: 450.00,
        organizationId: organization.id,
        categoryId: profilCategory.id,
        userId: user.id,
        standardValues: {
          profile_type: 'HEA',
          size: '100',
          length_mm: 6000,
          material: 'S235JR',
          weight_kg_m: 16.7
        }
      },
      {
        name: 'IPE 120',
        description: 'IPE 120 yapısal profil, 6m uzunluk',
        sku: 'PRF-IPE-120-6000',
        unit: 'adet',
        currentStock: 18,
        minStockLevel: 5,
        maxStockLevel: 80,
        lastPurchasePrice: 280.00,
        organizationId: organization.id,
        categoryId: profilCategory.id,
        userId: user.id,
        standardValues: {
          profile_type: 'IPE',
          size: '120',
          length_mm: 6000,
          material: 'S235JR',
          weight_kg_m: 10.4
        }
      },
      
      // Plaka items
      {
        name: 'S235 Plaka 10mm',
        description: 'S235JR çelik plaka, 10mm kalınlık',
        sku: 'PLK-S235-10-2000x1000',
        unit: 'm²',
        currentStock: 15.5,
        minStockLevel: 3,
        maxStockLevel: 50,
        lastPurchasePrice: 850.00,
        organizationId: organization.id,
        categoryId: plakaCategory.id,
        userId: user.id,
        standardValues: {
          material: 'S235JR',
          thickness_mm: 10,
          width_mm: 1000,
          length_mm: 2000,
          surface_treatment: 'Ham'
        }
      },
      
      // Halat items
      {
        name: 'Çelik Halat 6x19 Ø8mm',
        description: '6x19 FC konstruksiyon, Ø8mm galvanizli çelik halat',
        sku: 'HLT-6x19-8-GAL',
        unit: 'm',
        currentStock: 150,
        minStockLevel: 20,
        maxStockLevel: 500,
        lastPurchasePrice: 12.50,
        organizationId: organization.id,
        categoryId: halatCategory.id,
        userId: user.id,
        standardValues: {
          construction: '6x19_FC',
          diameter_mm: 8,
          breaking_load_kg: 2800,
          coating: 'Galvanizli',
          length_m: 1
        }
      },
      
      // Custom category item
      {
        name: 'Özel Bağlantı Elemanı X1',
        description: 'Müşteri X için özel tasarım bağlantı elemanı',
        sku: 'OSL-X1-001',
        unit: 'adet',
        currentStock: 8,
        minStockLevel: 2,
        maxStockLevel: 20,
        lastPurchasePrice: 125.00,
        organizationId: organization.id,
        categoryId: customCategory.id,
        userId: user.id,
        customValues: {
          part_number: 'X1-CONN-001',
          client: 'Müşteri X A.Ş.',
          specifications: 'AISI 316 paslanmaz çelik, özel boyutlar'
        }
      },
      
      // ASMAGERME Gerçek Mapa Stok Verileri
      {
        name: 'Asma Germe Galvaniz Mapa 1 1/8"',
        description: 'ASMAGERME Fabrikası - Asma Germe Galvaniz Mapa - 1 1/8 inç',
        sku: 'AGM-1-1/8',
        unit: 'adet',
        currentStock: 28,
        minStockLevel: 15,
        maxStockLevel: 50,
        lastPurchasePrice: 45.50,
        organizationId: organization.id,
        categoryId: mapaCategory.id,
        userId: user.id,
        standardValues: {
          type: 'ASMA_GERME_GALVANIZ',
          size_inch: '1 1/8',
          coating: 'GALVANIZED',
          supplier: 'ASMAGERME Fabrikası',
          status: 'Kullanıldı'
        }
      },
      {
        name: 'Asma Germe Galvaniz Mapa 1 3/4"',
        description: 'ASMAGERME Fabrikası - Asma Germe Galvaniz Mapa - 1 3/4 inç',
        sku: 'AGM-1-3/4',
        unit: 'adet',
        currentStock: 4,
        minStockLevel: 10,
        maxStockLevel: 30,
        lastPurchasePrice: 68.75,
        organizationId: organization.id,
        categoryId: mapaCategory.id,
        userId: user.id,
        standardValues: {
          type: 'ASMA_GERME_GALVANIZ',
          size_inch: '1 3/4',
          coating: 'GALVANIZED',
          supplier: 'ASMAGERME Fabrikası',
          status: 'Stok'
        }
      },
      {
        name: 'Asma Germe Galvaniz Mapa 1"',
        description: 'ASMAGERME Fabrikası - Asma Germe Galvaniz Mapa - 1 inç',
        sku: 'AGM-1',
        unit: 'adet',
        currentStock: 1,
        minStockLevel: 8,
        maxStockLevel: 25,
        lastPurchasePrice: 38.20,
        organizationId: organization.id,
        categoryId: mapaCategory.id,
        userId: user.id,
        standardValues: {
          type: 'ASMA_GERME_GALVANIZ',
          size_inch: '1',
          coating: 'GALVANIZED',
          supplier: 'ASMAGERME Fabrikası',
          status: 'Proje İçin Ayrılan'
        }
      },
      {
        name: 'Asma Germe Galvaniz Mapa 7/8"',
        description: 'ASMAGERME Fabrikası - Asma Germe Galvaniz Mapa - 7/8 inç',
        sku: 'AGM-7/8',
        unit: 'adet',
        currentStock: 1,
        minStockLevel: 6,
        maxStockLevel: 20,
        lastPurchasePrice: 32.80,
        organizationId: organization.id,
        categoryId: mapaCategory.id,
        userId: user.id,
        standardValues: {
          type: 'ASMA_GERME_GALVANIZ',
          size_inch: '7/8',
          coating: 'GALVANIZED',
          supplier: 'ASMAGERME Fabrikası',
          status: 'Stok'
        }
      },
      {
        name: 'Asma Germe Galvaniz Mapa 5/8"',
        description: 'ASMAGERME Fabrikası - Asma Germe Galvaniz Mapa - 5/8 inç',
        sku: 'AGM-5/8',
        unit: 'adet',
        currentStock: 4,
        minStockLevel: 8,
        maxStockLevel: 25,
        lastPurchasePrice: 28.45,
        organizationId: organization.id,
        categoryId: mapaCategory.id,
        userId: user.id,
        standardValues: {
          type: 'ASMA_GERME_GALVANIZ',
          size_inch: '5/8',
          coating: 'GALVANIZED',
          supplier: 'ASMAGERME Fabrikası',
          status: 'Stok'
        }
      },
      {
        name: 'Asma Germe Galvaniz Mapa 1 1/4"',
        description: 'ASMAGERME Fabrikası - Asma Germe Galvaniz Mapa - 1 1/4 inç',
        sku: 'AGM-1-1/4',
        unit: 'adet',
        currentStock: 2,
        minStockLevel: 5,
        maxStockLevel: 18,
        lastPurchasePrice: 52.30,
        organizationId: organization.id,
        categoryId: mapaCategory.id,
        userId: user.id,
        standardValues: {
          type: 'ASMA_GERME_GALVANIZ',
          size_inch: '1 1/4',
          coating: 'GALVANIZED',
          supplier: 'ASMAGERME Fabrikası',
          status: 'Stok'
        }
      },
      {
        name: 'Asma Germe Galvaniz Mapa 1/2"',
        description: 'ASMAGERME Fabrikası - Asma Germe Galvaniz Mapa - 1/2 inç',
        sku: 'AGM-1/2',
        unit: 'adet',
        currentStock: 10,
        minStockLevel: 12,
        maxStockLevel: 35,
        lastPurchasePrice: 22.90,
        organizationId: organization.id,
        categoryId: mapaCategory.id,
        userId: user.id,
        standardValues: {
          type: 'ASMA_GERME_GALVANIZ',
          size_inch: '1/2',
          coating: 'GALVANIZED',
          supplier: 'ASMAGERME Fabrikası',
          status: 'Stok'
        }
      }
    ]
  })

  console.log('✅ Stock items created')
  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
