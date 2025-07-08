// apps/api/prisma/seed-categories.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCategories() {
  try {
    // Get or create default organization
    let organization = await prisma.organization.findFirst({
      where: { subdomain: 'default' },
    });

    if (!organization) {
      organization = await prisma.organization.create({
        data: {
          name: 'Default Organization',
          subdomain: 'default',
        },
      });
    }

    // Seed categories
    const categories = [
      {
        name: 'Electronics',
        description: 'Electronic devices and accessories',
        organizationId: organization.id,
      },
      {
        name: 'Clothing',
        description: 'Apparel and fashion items',
        organizationId: organization.id,
      },
      {
        name: 'Books',
        description: 'Books and publications',
        organizationId: organization.id,
      },
      {
        name: 'Home & Garden',
        description: 'Home improvement and garden supplies',
        organizationId: organization.id,
      },
      {
        name: 'Sports',
        description: 'Sports equipment and accessories',
        organizationId: organization.id,
      },
    ];

    for (const category of categories) {
      const existing = await prisma.category.findFirst({
        where: {
          name: category.name,
          organizationId: category.organizationId,
        },
      });

      if (!existing) {
        await prisma.category.create({
          data: category,
        });
        console.log(`Created category: ${category.name}`);
      } else {
        console.log(`Category already exists: ${category.name}`);
      }
    }

    console.log('Categories seeded successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategories();