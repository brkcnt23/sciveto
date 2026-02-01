// packages/database/prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { seedSystemTemplates } from './seed-templates' // Senin template dosyanı çağıracağız

const prisma = new PrismaClient()

async function main() {
  console.log('🏭 FABRİKA KURULUMU BAŞLIYOR...')

  // 1. Organizasyonu Kur
  const org = await prisma.organization.upsert({
    where: { subdomain: 'demo' },
    update: {},
    create: {
      name: 'Sciveto Demo Factory',
      subdomain: 'demo',
      domain: 'demo.sciveto.com',
      settings: { currency: 'TRY', language: 'tr' }
    }
  })
  console.log('✅ Fabrika (Organization) kuruldu.')

  // 2. Admin Kullanıcısını Kur
  // Şifre: "password123" (Hashlenmiş hali)
  const user = await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      password: '$2b$10$K7L/VGGykHT9TiKqRlwBAepEBV1CHTCWVBm2LLLQPEDovV.2pJGOS', 
      firstName: 'Admin',
      lastName: 'User',
      role: 'ORG_ADMIN',
      organizationId: org.id
    }
  })
  console.log('✅ Admin Kullanıcısı oluşturuldu: admin@demo.com')

  // 3. Endüstriyel Şablonları Yükle (Senin attığın dosya)
  // NOT: seed-templates.ts dosyasının packages/database/prisma/ altında olduğundan emin ol.
  try {
    console.log('⚙️  Endüstriyel Şablonlar işleniyor...');
    await seedSystemTemplates(); 
    console.log('✅ Şablonlar ve Kategoriler yüklendi.');
  } catch (e) {
    console.error('⚠️ Şablon yükleme uyarısı:', e);
  }

  // 4. Dual-Mode Test Data
  console.log('⚙️  Dual-Mode Test Verileri oluşturuluyor...');
  
  // Item A: Factory Mode (Quick Add - Incomplete)
  await prisma.stockItem.upsert({
    where: { sku: 'BLT-20' },
    update: {},
    create: {
      name: 'Raw Bolt 20mm',
      sku: 'BLT-20',
      currentStock: 500,
      availableStock: 500,
      unit: 'pcs',
      entryMode: 'QUICK',
      isComplete: false,
      status: 'ACTIVE',
      organizationId: org.id,
      userId: user.id
    }
  });
  console.log('✅ Quick Add test item oluşturuldu: BLT-20');

  // Item B: Office Mode (Detailed - Complete)
  await prisma.stockItem.upsert({
    where: { sku: 'CSL-KG-01' },
    update: {},
    create: {
      name: 'King Size Duvet Set',
      sku: 'CSL-KG-01',
      currentStock: 25,
      availableStock: 25,
      unit: 'pcs',
      purchasePrice: 1500.00,
      salePrice: 2500.00,
      salePrice2: 2750.00,
      shelfCode: 'A-12',
      color: 'Gold',
      brand: 'Premium Home',
      vatRate: 20,
      entryMode: 'DETAILED',
      isComplete: true,
      status: 'ACTIVE',
      organizationId: org.id,
      userId: user.id
    }
  });
  console.log('✅ Detailed item oluşturuldu: CSL-KG-01');
  
  console.log('🚀 SİSTEM HAZIR! Giriş yapabilirsiniz.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })