// Dual-Mode Inventory Entry - Seed Data
// Bu script hem QUICK hem DETAILED modda örnek veriler oluşturur

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedDualModeItems() {
  console.log('🚀 Dual-Mode Inventory Seed Data başlatılıyor...');

  // Organizasyon ve kullanıcı al
  const org = await prisma.organization.findFirst();
  const user = await prisma.user.findFirst({ where: { organizationId: org?.id } });

  if (!org || !user) {
    console.log('❌ Organizasyon veya kullanıcı bulunamadı!');
    console.log('Önce bir kullanıcı kaydedin.');
    return;
  }

  console.log(`📦 Organizasyon: ${org.name}`);
  console.log(`👤 Kullanıcı: ${user.email}`);

  // Kategori al veya oluştur
  let category = await prisma.category.findFirst({
    where: { organizationId: org.id }
  });

  if (!category) {
    category = await prisma.category.create({
      data: {
        name: 'Genel Malzemeler',
        description: 'Genel inşaat malzemeleri',
        color: '#3B82F6',
        organizationId: org.id,
      }
    });
    console.log('📁 Yeni kategori oluşturuldu: Genel Malzemeler');
  }

  // ========== QUICK MODE ÖRNEKLERİ ==========
  console.log('\n📝 Quick Mode örnekleri oluşturuluyor...');

  const quickModeItems = [
    { name: 'Çimento Torbası', sku: 'CIM-001', quantity: 50, unit: 'adet', notes: 'Acil sipariş edildi' },
    { name: 'Demir Çubuk 12mm', sku: 'DEM-012', quantity: 100, unit: 'adet' },
    { name: 'Tuğla', sku: 'TUG-001', quantity: 500, unit: 'adet' },
    { name: 'Kum', sku: 'KUM-001', quantity: 10, unit: 'm3' },
    { name: 'Çakıl', sku: 'CAK-001', quantity: 8, unit: 'm3' },
    { name: 'PVC Boru 110mm', sku: 'PVC-110', quantity: 25, unit: 'metre' },
    { name: 'Elektrik Kablosu 2.5mm', sku: 'ELK-25', quantity: 200, unit: 'metre' },
  ];

  for (const item of quickModeItems) {
    const existing = await prisma.stockItem.findFirst({
      where: { sku: item.sku, organizationId: org.id }
    });

    if (!existing) {
      await prisma.stockItem.create({
        data: {
          name: item.name,
          sku: item.sku,
          currentStock: item.quantity,
          availableStock: item.quantity,
          unit: item.unit,
          notes: item.notes,
          categoryId: category.id,
          userId: user.id,
          organizationId: org.id,
          entryMode: 'QUICK',
          isComplete: false,
          status: 'ACTIVE',
        }
      });
      console.log(`  ✅ ${item.name} (QUICK - Tamamlanmamış)`);
    } else {
      console.log(`  ⏭️ ${item.name} zaten var`);
    }
  }

  // ========== DETAILED MODE ÖRNEKLERİ ==========
  console.log('\n📋 Detailed Mode örnekleri oluşturuluyor...');

  const detailedModeItems = [
    {
      name: 'Portland Çimento CEM I 42.5R',
      sku: 'CIM-PRO-001',
      quantity: 100,
      unit: 'torba',
      price: 145.50,
      description: 'Yüksek dayanımlı Portland çimentosu, 50kg torba',
      minStockLevel: 20,
      maxStockLevel: 200,
      location: 'Depo A - Raf 1',
      supplier: 'Çimsa A.Ş.',
    },
    {
      name: 'Nervürlü Demir 8mm',
      sku: 'DEM-N08-001',
      quantity: 500,
      unit: 'adet',
      price: 85.00,
      description: 'B420C nervürlü inşaat demiri, 12m boy',
      minStockLevel: 100,
      maxStockLevel: 1000,
      location: 'Açık Alan - Demir Deposu',
      supplier: 'Kardemir A.Ş.',
    },
    {
      name: 'Seramik Karo 60x60',
      sku: 'SER-60-001',
      quantity: 200,
      unit: 'm2',
      price: 95.00,
      description: 'Mat yüzey, gri renk, yer seramiği',
      minStockLevel: 50,
      maxStockLevel: 500,
      location: 'Depo B - Seramik Bölümü',
      supplier: 'Kaleseramik',
    },
  ];

  for (const item of detailedModeItems) {
    const existing = await prisma.stockItem.findFirst({
      where: { sku: item.sku, organizationId: org.id }
    });

    if (!existing) {
      await prisma.stockItem.create({
        data: {
          name: item.name,
          sku: item.sku,
          description: item.description,
          currentStock: item.quantity,
          availableStock: item.quantity,
          unit: item.unit,
          lastPurchasePrice: item.price,
          averageCost: item.price,
          totalValue: item.quantity * item.price,
          minStockLevel: item.minStockLevel,
          maxStockLevel: item.maxStockLevel,
          location: item.location,
          supplier: item.supplier,
          categoryId: category.id,
          userId: user.id,
          organizationId: org.id,
          entryMode: 'DETAILED',
          isComplete: true,
          status: 'ACTIVE',
        }
      });
      console.log(`  ✅ ${item.name} (DETAILED - Tam kayıt)`);
    } else {
      console.log(`  ⏭️ ${item.name} zaten var`);
    }
  }

  // Özet
  const stats = await prisma.stockItem.groupBy({
    by: ['isComplete'],
    where: { organizationId: org.id },
    _count: true,
  });

  console.log('\n📊 Özet:');
  stats.forEach(s => {
    console.log(`  ${s.isComplete ? '✅ Tamamlanmış' : '⏳ Tamamlanmamış'}: ${s._count} adet`);
  });

  console.log('\n🎉 Dual-Mode seed data tamamlandı!');
}

seedDualModeItems()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
