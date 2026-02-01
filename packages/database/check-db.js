const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('=== Organizations ===');
  const orgs = await prisma.organization.findMany();
  orgs.forEach(o => {
    console.log(`- ${o.name} (subdomain: ${o.subdomain}, id: ${o.id})`);
    console.log(`  Settings: ${JSON.stringify(o.settings)}`);
  });

  console.log('\n=== Users ===');
  const users = await prisma.user.findMany({
    include: { organization: true }
  });
  users.forEach(u => {
    console.log(`- ${u.email} (role: ${u.role}, org: ${u.organization?.name})`);
  });

  console.log('\n=== Categories ===');
  const cats = await prisma.category.findMany({
    include: { organization: true }
  });
  cats.forEach(c => {
    console.log(`- ${c.name} (org: ${c.organization?.name}, isSystemBased: ${c.isSystemBased})`);
  });

  console.log('\n=== System Templates ===');
  const templates = await prisma.systemCategoryTemplate.findMany();
  templates.forEach(t => {
    console.log(`- ${t.name} (industry: ${t.industry}, id: ${t.id})`);
  });

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
