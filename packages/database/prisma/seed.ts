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
      code: 'ORG-001',
      subdomain: 'demo',
      domain: 'demo.sciveto.com',
      plan: 'BASIC',
      maxUsers: 10,
      maxProjects: 50,
      userCount: 1,
      status: 'ACTIVE',
      settings: { currency: 'TRY', language: 'tr' }
    }
  })
  console.log('✅ Fabrika (Organization) kuruldu:', org.code)

  // 2. Admin Kullanıcısını Kur (Organization Owner)
  // Şifre: "password123" (Hashlenmiş hali)
  const user = await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      password: '$2b$10$K7L/VGGykHT9TiKqRlwBAepEBV1CHTCWVBm2LLLQPEDovV.2pJGOS', 
      firstName: 'Admin',
      lastName: 'User',
      role: 'ORGANIZATION_OWNER',
      isActive: true,
      isOnline: false,
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

  // 4. Test Data
  console.log('Test Verileri olusturuluyor...');

  await prisma.stockItem.upsert({
    where: { code: 'BLT-20' },
    update: {},
    create: {
      name: 'Raw Bolt 20mm',
      code: 'BLT-20',
      quantity: 500,
      unit: 'pcs',
      minQuantity: 10,
      maxQuantity: 1000,
      purchasePrice: 150.00,
      sellingPrice: 250.00,
      organizationId: org.id,
      warehouseLocation: 'A-12',
    }
  });
  console.log('Test item olusturuldu: BLT-20');

  await prisma.stockItem.upsert({
    where: { code: 'CSL-KG-01' },
    update: {},
    create: {
      name: 'King Size Duvet Set',
      code: 'CSL-KG-01',
      quantity: 25,
      unit: 'pcs',
      minQuantity: 5,
      maxQuantity: 50,
      purchasePrice: 1500.00,
      sellingPrice: 2500.00,
      organizationId: org.id,
      warehouseLocation: 'B-03',
    }
  });
  console.log('Test item olusturuldu: CSL-KG-01');
  
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