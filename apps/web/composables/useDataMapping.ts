// apps/web/composables/useDataMapping.ts
import type { StockItem } from '~/types/stock'

export const useDataMapping = () => {
  
  const createStockMembran = (originalData: any[]): StockItem[] => {
    return originalData.map((item, index) => ({
      id: `membran-${index}`,
      name: `${item.brand} ${item.name}`,
      description: item.application || 'No description',
      category: 'Membran',
      categoryId: 'membran-category',
      unit: 'm²',
      stock: 0,
      status: 'ACTIVE' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      originalRef: item,
      stockInfo: {
        defaultMinStock: 50,
        defaultMaxStock: 500,
        preferredSupplier: item.brand
      },
      specifications: {
        brand: item.brand,
        weight_g_m2: item.weight_g_m2,
        width_cm: item.width_cm,
        warranty_years: item.warranty_years
      }
    }))
  }
  
  const createStockHalat = (originalData: any): StockItem[] => {
    return originalData.rows.map((item: any, index: number) => ({
      id: `halat-${index}`,
      name: `${item.diameter_mm}mm ${item.material} Halat`,
      description: `${item.construction} construction`,
      category: 'Halat',
      unit: 'm',
      stock: 0,
      status: 'ACTIVE' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      originalRef: item,
      stockInfo: {
        defaultMinStock: 100,
        defaultMaxStock: 1000
      },
      specifications: {
        diameter_mm: item.diameter_mm,
        material: item.material,
        construction: item.construction,
        breaking_load_kg: item.breaking_load_kg
      }
    }))
  }
  
  const createStockMapa = (originalData: any): StockItem[] => {
    const stockItems: StockItem[] = []
    
    // Halat Ucu Saplaması
    if (originalData.HALAT_UCU_SAPLAMASI) {
      originalData.HALAT_UCU_SAPLAMASI.forEach((item: any, index: number) => {
        stockItems.push({
          id: `mapa-${index}`,
          name: `Halat Ucu Saplaması ${item.rope_mm}mm`,
          description: `${item.rope_mm}mm halat için`,
          category: 'Mapa',
          categoryId: 'mapa-category',
          unit: 'adet',
          stock: 0,
          status: 'ACTIVE' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
          originalRef: item,
          stockInfo: {
            defaultMinStock: 10,
            defaultMaxStock: 100
          },
          specifications: {
            rope_mm: item.rope_mm,
            type: 'Halat Ucu Saplaması'
          }
        })
      })
    }
    
    return stockItems
  }
  
  const createStockPlaka = (originalData: any[]): StockItem[] => {
    return originalData.map((item, index) => ({
      id: `plaka-${index}`,
      name: `${item.thickness || item.kalinlik}mm ${item.material || item.malzeme} Plaka`,
      description: item.description || item.aciklama || `${item.width || item.genislik}x${item.length || item.uzunluk}mm`,
      category: 'Plaka',
      categoryId: 'plaka-category',
      unit: item.unit || 'adet',
      stock: 0,
      status: 'ACTIVE' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      originalRef: item,
      stockInfo: {
        defaultMinStock: 20,
        defaultMaxStock: 200,
        preferredSupplier: item.supplier || item.tedarikci
      },
      specifications: {
        thickness: item.thickness || item.kalinlik,
        material: item.material || item.malzeme,
        width: item.width || item.genislik,
        length: item.length || item.uzunluk,
        weight: item.weight
      }
    }))
  }
  
  const createStockProfil = (originalData: any[]): StockItem[] => {
    return originalData.map((item, index) => ({
      id: `profil-${index}`,
      name: `${item.profile_type || item.profil_tipi} ${item.dimensions || item.olculer}`,
      description: item.description || item.aciklama || `${item.material || item.malzeme} profil`,
      category: 'Profil',
      categoryId: 'profil-category',
      unit: item.unit || 'm',
      stock: 0,
      status: 'ACTIVE' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      originalRef: item,
      stockInfo: {
        defaultMinStock: 30,
        defaultMaxStock: 300,
        preferredSupplier: item.supplier || item.tedarikci
      },
      specifications: {
        profile_type: item.profile_type || item.profil_tipi,
        dimensions: item.dimensions || item.olculer,
        material: item.material || item.malzeme,
        length: item.length || item.uzunluk
      }
    }))
  }
  
  return {
    createStockMembran,
    createStockHalat,
    createStockMapa,
    createStockPlaka,
    createStockProfil
  }
}
