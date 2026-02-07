// Cleanup script to remove legacy test Organizations with code LIKE 'ORG-%' and their related data.
// Usage:
//   node scripts/cleanup-old-orgs.js        # dry-run (shows what will be deleted)
//   node scripts/cleanup-old-orgs.js --run  # perform deletions

// SQL equivalent (for manual use):
// DELETE FROM "StockItem" WHERE "organizationId" IN (SELECT id FROM "Organization" WHERE code LIKE 'ORG-%');
// DELETE FROM "User" WHERE "organizationId" IN (SELECT id FROM "Organization" WHERE code LIKE 'ORG-%');
// DELETE FROM "StockCategory" WHERE "organizationId" IN (SELECT id FROM "Organization" WHERE code LIKE 'ORG-%');
// DELETE FROM "Organization" WHERE code LIKE 'ORG-%';

const { PrismaClient } = require('../node_modules/.pnpm/@prisma+client@6.13.0_prism_5976223c52a35cf7e022cc58f6ace504/node_modules/@prisma/client')

;(async () => {
  const prisma = new PrismaClient()
  try {
    const orgs = await prisma.organization.findMany({ where: { code: { startsWith: 'ORG-' } } })
    if (!orgs || orgs.length === 0) {
      console.log('No organizations found with code LIKE "ORG-%"')
      return
    }

    console.log(`Found ${orgs.length} organization(s) with legacy codes:`)
    orgs.forEach(o => console.log(`- ${o.id} ${o.code} (${o.name})`))

    const orgIds = orgs.map(o => o.id)

    // Show counts
    const counts = {
      stockItems: await prisma.stockItem.count({ where: { organizationId: { in: orgIds } } }),
      users: await prisma.user.count({ where: { organizationId: { in: orgIds } } }),
      stockCategories: await prisma.stockCategory.count({ where: { organizationId: { in: orgIds } } }),
    }

    console.log('Will delete (counts):', counts)

    if (!process.argv.includes('--run')) {
      console.log('\nDry run — no deletions performed. Re-run with `--run` to execute cleanup.')
      return
    }

    console.log('\nExecuting deletions...')
    await prisma.stockItem.deleteMany({ where: { organizationId: { in: orgIds } } })
    await prisma.user.deleteMany({ where: { organizationId: { in: orgIds } } })
    await prisma.stockCategory.deleteMany({ where: { organizationId: { in: orgIds } } })
    await prisma.organization.deleteMany({ where: { id: { in: orgIds } } })

    console.log('Deletion completed successfully.')
  } catch (e) {
    console.error('Error during cleanup:', e)
  } finally {
    await prisma.$disconnect()
  }
})()
