// Reset test data for clean registration testing
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetTestData() {
  try {
    // Delete fac@tor.com user
    const deletedUser = await prisma.user.deleteMany({
      where: { email: 'fac@tor.com' }
    });
    console.log('Deleted fac@tor.com:', deletedUser.count);

    // Delete Default Organization (and any users/categories tied to it)
    const defaultOrg = await prisma.organization.findFirst({
      where: { subdomain: 'default' }
    });
    
    if (defaultOrg) {
      // Delete all users in default org first
      await prisma.user.deleteMany({
        where: { organizationId: defaultOrg.id }
      });
      
      // Delete all categories in default org
      await prisma.category.deleteMany({
        where: { organizationId: defaultOrg.id }
      });
      
      // Delete the organization
      await prisma.organization.delete({
        where: { id: defaultOrg.id }
      });
      console.log('Deleted Default Organization');
    }

    console.log('\\n✅ Test data reset complete! Ready for fresh registration test.');
    
    // Show remaining data
    const orgs = await prisma.organization.findMany();
    const users = await prisma.user.findMany({ include: { organization: true } });
    const cats = await prisma.category.findMany();
    
    console.log('\\n=== Remaining Organizations ===');
    orgs.forEach(o => console.log(`- ${o.name} (${o.subdomain})`));
    
    console.log('\\n=== Remaining Users ===');
    users.forEach(u => console.log(`- ${u.email} (${u.role}, org: ${u.organization?.name})`));
    
    console.log('\\n=== Remaining Categories ===');
    cats.forEach(c => console.log(`- ${c.name}`));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetTestData();
