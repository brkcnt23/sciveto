// packages/database/prisma/seed-templates.ts
import { PrismaClient } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();

// Type-safe client access
const db = prisma as any;

// Template definitions based on our JSON data
const SYSTEM_TEMPLATES = [
  {
    name: 'Profil',
    version: '1.0',
    description: 'Yapısal çelik profiller - HEA, HEB, IPE, UPN serisi',
    industry: 'steel-manufacturing',
    icon: 'i-lucide-box',
    changelog: 'Initial template with standard steel profiles',
    standards: [
      { name: 'HEA', value: 'HEA', category: 'profile_type', sortOrder: 1 },
      { name: 'HEB', value: 'HEB', category: 'profile_type', sortOrder: 2 },
      { name: 'HEM', value: 'HEM', category: 'profile_type', sortOrder: 3 },
      { name: 'IPE', value: 'IPE', category: 'profile_type', sortOrder: 4 },
      { name: 'IPN', value: 'IPN', category: 'profile_type', sortOrder: 5 },
      { name: 'UPN', value: 'UPN', category: 'profile_type', sortOrder: 6 },
      { name: 'UPE', value: 'UPE', category: 'profile_type', sortOrder: 7 },
      { name: 'RHS', value: 'RHS', category: 'profile_type', sortOrder: 8 },
      { name: 'SHS', value: 'SHS', category: 'profile_type', sortOrder: 9 },
      { name: 'CHS', value: 'CHS', category: 'profile_type', sortOrder: 10 },
      { name: 'BORU', value: 'BORU', category: 'profile_type', sortOrder: 11 },
      // Material standards
      { name: 'S235JR', value: 'S235JR', category: 'material', sortOrder: 1 },
      { name: 'S275JR', value: 'S275JR', category: 'material', sortOrder: 2 },
      { name: 'S355JR', value: 'S355JR', category: 'material', sortOrder: 3 },
      { name: 'S355J2', value: 'S355J2', category: 'material', sortOrder: 4 },
    ],
    fields: [
      {
        name: 'profile_type',
        label: 'Profil Tipi',
        type: 'select',
        required: true,
        sortOrder: 1
      },
      {
        name: 'dimensions',
        label: 'Boyutlar',
        type: 'text',
        required: true,
        sortOrder: 2
      },
      {
        name: 'material',
        label: 'Malzeme',
        type: 'select',
        required: true,
        sortOrder: 3
      },
      {
        name: 'height_mm',
        label: 'Yükseklik (mm)',
        type: 'number',
        required: false,
        unit: 'mm',
        sortOrder: 4
      },
      {
        name: 'width_mm',
        label: 'Genişlik (mm)',
        type: 'number',
        required: false,
        unit: 'mm',
        sortOrder: 5
      },
      {
        name: 'web_thickness_mm',
        label: 'Gövde Kalınlığı (mm)',
        type: 'number',
        required: false,
        unit: 'mm',
        sortOrder: 6
      },
      {
        name: 'flange_thickness_mm',
        label: 'Başlık Kalınlığı (mm)',
        type: 'number',
        required: false,
        unit: 'mm',
        sortOrder: 7
      },
      {
        name: 'weight_kg_m',
        label: 'Birim Ağırlık (kg/m)',
        type: 'number',
        required: false,
        unit: 'kg/m',
        sortOrder: 8
      }
    ]
  },

  {
    name: 'Plaka',
    version: '1.0',
    description: 'Çelik plakalar - Yapısal ve paslanmaz çelik çeşitleri',
    industry: 'steel-manufacturing',
    icon: 'i-lucide-square',
    changelog: 'Initial template with steel plate standards',
    standards: [
      { name: 'S235JR', value: 'S235JR', category: 'material', sortOrder: 1 },
      { name: 'S275JR', value: 'S275JR', category: 'material', sortOrder: 2 },
      { name: 'S355JR', value: 'S355JR', category: 'material', sortOrder: 3 },
      { name: 'S355J2', value: 'S355J2', category: 'material', sortOrder: 4 },
      { name: 'AISI 304', value: 'AISI 304', category: 'material', sortOrder: 5 },
      { name: 'AISI 316L', value: 'AISI 316L', category: 'material', sortOrder: 6 },
      { name: 'DX51D+Z (Galvaniz)', value: 'DX51D+Z', category: 'material', sortOrder: 7 },
      { name: 'P265GH', value: 'P265GH', category: 'material', sortOrder: 8 },
      { name: 'Hardox 400', value: 'Hardox 400', category: 'material', sortOrder: 9 },
      { name: 'Hardox 450', value: 'Hardox 450', category: 'material', sortOrder: 10 },
    ],
    fields: [
      {
        name: 'material',
        label: 'Malzeme',
        type: 'select',
        required: true,
        sortOrder: 1
      },
      {
        name: 'thickness_mm',
        label: 'Kalınlık (mm)',
        type: 'number',
        required: true,
        unit: 'mm',
        sortOrder: 2
      },
      {
        name: 'standard',
        label: 'Standart',
        type: 'text',
        required: false,
        defaultValue: 'EN 10025-2',
        sortOrder: 3
      },
      {
        name: 'yield_strength_MPa',
        label: 'Akma Dayanımı (MPa)',
        type: 'number',
        required: false,
        unit: 'MPa',
        sortOrder: 4
      },
      {
        name: 'tensile_strength_MPa',
        label: 'Çekme Dayanımı (MPa)',
        type: 'number',
        required: false,
        unit: 'MPa',
        sortOrder: 5
      }
    ]
  },

  {
    name: 'Halat',
    version: '1.0',
    description: 'Çelik halat çeşitleri - Karbon ve paslanmaz çelik',
    industry: 'tensile-architecture',
    icon: 'i-lucide-cable',
    changelog: 'Initial template with wire rope constructions',
    standards: [
      { name: '6x19', value: '6x19', category: 'construction', sortOrder: 1 },
      { name: '6x37', value: '6x37', category: 'construction', sortOrder: 2 },
      { name: '7x7', value: '7x7', category: 'construction', sortOrder: 3 },
      { name: '7x19', value: '7x19', category: 'construction', sortOrder: 4 },
      { name: 'FC', value: 'FC', category: 'core_type', sortOrder: 1 },
      { name: 'IWRC', value: 'IWRC', category: 'core_type', sortOrder: 2 },
      { name: 'Carbon Steel', value: 'Carbon Steel', category: 'material', sortOrder: 1 },
      { name: 'AISI 316', value: 'AISI 316', category: 'material', sortOrder: 2 },
      { name: 'AISI 304', value: 'AISI 304', category: 'material', sortOrder: 3 },
    ],
    fields: [
      {
        name: 'construction',
        label: 'Yapı',
        type: 'select',
        required: true,
        sortOrder: 1
      },
      {
        name: 'diameter_mm',
        label: 'Çap (mm)',
        type: 'number',
        required: true,
        unit: 'mm',
        sortOrder: 2
      },
      {
        name: 'material',
        label: 'Malzeme',
        type: 'select',
        required: true,
        sortOrder: 3
      },
      {
        name: 'core_type',
        label: 'Göbek Tipi',
        type: 'select',
        required: false,
        sortOrder: 4
      },
      {
        name: 'tensile_grade_MPa',
        label: 'Çekme Sınıfı (MPa)',
        type: 'number',
        required: false,
        unit: 'MPa',
        sortOrder: 5
      },
      {
        name: 'unit_weight_kg_m',
        label: 'Birim Ağırlık (kg/m)',
        type: 'number',
        required: false,
        unit: 'kg/m',
        sortOrder: 6
      },
      {
        name: 'min_break_kN',
        label: 'Min. Kopma Kuvveti (kN)',
        type: 'number',
        required: false,
        unit: 'kN',
        sortOrder: 7
      }
    ]
  },

  {
    name: 'Mapa',
    version: '1.0',
    description: 'Halat ucu aksesuarları - Saplama, çatal, mapa çeşitleri',
    industry: 'tensile-architecture',
    icon: 'i-lucide-link',
    changelog: 'Initial template with rope end fittings',
    standards: [
      { name: 'Halat Ucu Saplaması', value: 'saplama', category: 'fitting_type', sortOrder: 1 },
      { name: 'Halat Ucu Çatalı', value: 'catal', category: 'fitting_type', sortOrder: 2 },
      { name: 'Halat Ucu Mapası', value: 'mapa', category: 'fitting_type', sortOrder: 3 },
      { name: 'Carbon Steel', value: 'Carbon Steel', category: 'material', sortOrder: 1 },
      { name: 'Stainless Steel', value: 'Stainless Steel', category: 'material', sortOrder: 2 },
    ],
    fields: [
      {
        name: 'fitting_type',
        label: 'Aksesuar Tipi',
        type: 'select',
        required: true,
        sortOrder: 1
      },
      {
        name: 'rope_diameter_mm',
        label: 'Halat Çapı (mm)',
        type: 'number',
        required: true,
        unit: 'mm',
        sortOrder: 2
      },
      {
        name: 'material',
        label: 'Malzeme',
        type: 'select',
        required: true,
        sortOrder: 3
      },
      {
        name: 'thread',
        label: 'Diş Ölçüsü',
        type: 'text',
        required: false,
        sortOrder: 4
      }
    ]
  },

  {
    name: 'Membran',
    version: '1.0',
    description: 'Tensile membran kumaşları - Marka ve özellik bazlı',
    industry: 'tensile-architecture',
    icon: 'i-lucide-layers',
    changelog: 'Initial template with membrane fabric brands',
    standards: [
      { name: 'FERRARI', value: 'FERRARI', category: 'brand', sortOrder: 1 },
      { name: 'MEHLER', value: 'MEHLER', category: 'brand', sortOrder: 2 },
      { name: 'SIOEN', value: 'SIOEN', category: 'brand', sortOrder: 3 },
      { name: 'VERSEIDAG', value: 'VERSEIDAG', category: 'brand', sortOrder: 4 },
      { name: 'SEFAR', value: 'SEFAR', category: 'brand', sortOrder: 5 },
    ],
    fields: [
      {
        name: 'brand',
        label: 'Marka',
        type: 'select',
        required: true,
        sortOrder: 1
      },
      {
        name: 'weight_g_m2',
        label: 'Ağırlık (g/m²)',
        type: 'number',
        required: true,
        unit: 'g/m²',
        sortOrder: 2
      },
      {
        name: 'width_cm',
        label: 'En (cm)',
        type: 'number',
        required: true,
        unit: 'cm',
        sortOrder: 3
      },
      {
        name: 'warranty_years',
        label: 'Garanti (yıl)',
        type: 'number',
        required: false,
        unit: 'yıl',
        sortOrder: 4
      },
      {
        name: 'application',
        label: 'Uygulama Alanı',
        type: 'text',
        required: false,
        sortOrder: 5
      }
    ]
  }
];

async function seedSystemTemplates() {
  console.log('🌱 Starting template seeding...');

  try {
    // Clear existing templates (dev only)
    if (process.env.NODE_ENV === 'development') {
      await db.templateField.deleteMany();
      await db.templateStandard.deleteMany();
      await db.systemCategoryTemplate.deleteMany();
      console.log('🧹 Cleared existing templates');
    }

    for (const templateData of SYSTEM_TEMPLATES) {
      console.log(`📦 Creating template: ${templateData.name}`);

      // Create template
      const template = await db.systemCategoryTemplate.create({
        data: {
          name: templateData.name,
          version: templateData.version,
          description: templateData.description,
          industry: templateData.industry,
          icon: templateData.icon,
          changelog: templateData.changelog,
          isLatest: true
        }
      });

      // Create standards
      for (const standard of templateData.standards) {
        await db.templateStandard.create({
          data: {
            templateId: template.id,
            name: standard.name,
            value: standard.value,
            category: standard.category,
            sortOrder: standard.sortOrder
          }
        });
      }

      // Create fields
      for (const field of templateData.fields) {
        await db.templateField.create({
          data: {
            templateId: template.id,
            name: field.name,
            label: field.label,
            type: field.type as any,
            required: field.required,
            defaultValue: field.defaultValue,
            unit: field.unit,
            sortOrder: field.sortOrder
          }
        });
      }

      console.log(`✅ Template ${templateData.name} created with ${templateData.standards.length} standards and ${templateData.fields.length} fields`);
    }

    console.log('🎉 Template seeding completed successfully!');
    
    // Show summary
    const templateCount = await db.systemCategoryTemplate.count();
    const standardCount = await db.templateStandard.count();
    const fieldCount = await db.templateField.count();
    
    console.log(`\n📊 Summary:`);
    console.log(`   Templates: ${templateCount}`);
    console.log(`   Standards: ${standardCount}`);
    console.log(`   Fields: ${fieldCount}`);

  } catch (error) {
    console.error('❌ Template seeding failed:', error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

// Execute if run directly
if (require.main === module) {
  seedSystemTemplates()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedSystemTemplates };