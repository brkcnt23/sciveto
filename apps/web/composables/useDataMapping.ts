// apps/web/composables/useDataMapping.ts
import type { StockItem } from '~/types/stock'

export const useDataMapping = () => {
  
  const createStockMembran = (originalData: any[]): StockItem[] => {
    return originalData.map((item, index) => ({
      id: `membran-${index}`,
      name: `${item.brand} ${item.name}`,
      description: item.application,
      category: 'Membran',
      unit: 'm²',
      originalRef: item, // Orijinal dataya referans
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
      originalRef: item,
      stockInfo: {
        defaultMinStock: 100,
        defaultMaxStock: 1000
      },
      specifications: {
        construction: item.construction,
        material: item.material,
        core_type: item.core_type,
        diameter_mm: item.diameter_mm,
        tensile_grade_MPa: item.tensile_grade_MPa,
        min_break_kN: item.min_break_kN,
        standards: item.standard_refs
      }
    }))
  }
  
  const createStockMapa = (originalData: any): StockItem[] => {
    const stockItems: StockItem[] = []
    
    // Halat Ucu Saplaması
    if (originalData.HALAT_UCU_SAPLAMASI) {
      originalData.HALAT_UCU_SAPLAMASI.forEach((item: any, index: number) => {
        stockItems.push({
          id: `mapa-saplama-${index}`,
          name: `Halat Ucu Saplaması ${item.rope_mm}mm`,
          description: `${item.rope_mm}mm halat için`,
          category: 'Mapa',
          unit: 'adet',
          originalRef: item,
          stockInfo: {
            defaultMinStock: 10,
            defaultMaxStock: 100
          },
          specifications: {
            rope_diameter_mm: item.rope_mm,
            A_mm: item.A_mm,
            B1_mm: item.B1_mm,
            B2_mm: item.B2_mm,
            thread: item.thread
          }
        })
      })
    }
    
    return stockItems
  }
  
  const createStockPlaka = (originalData: any[]): StockItem[] => {
    return originalData.map((item, index) => ({
      id: `plaka-${index}`,
      name: item.name || `${item.material || 'Plaka'} ${item.thickness_mm || ''}mm`,
      description: item.description || `${item.material} plaka`,
      category: 'Plaka',
      unit: item.unit || 'm²',
      originalRef: item,
      stockInfo: {
        defaultMinStock: 20,
        defaultMaxStock: 200,
        preferredSupplier: item.supplier
      },
      specifications: {
        material: item.material,
        thickness_mm: item.thickness_mm,
        standard: item.standard,
        yield_strength_MPa: item.yield_strength_MPa
      }
    }))
  }
  
  const createStockProfil = (originalData: any[]): StockItem[] => {
    return originalData.map((item, index) => ({
      id: `profil-${index}`,
      name: item.name || `${item.profile_type} ${item.dimensions}`,
      description: item.description || `${item.profile_type} profil`,
      category: 'Profil',
      unit: item.unit || 'm',
      originalRef: item,
      stockInfo: {
        defaultMinStock: 30,
        defaultMaxStock: 300,
        preferredSupplier: item.supplier
      },
      specifications: {
        profile_type: item.profile_type,
        dimensions: item.dimensions,
        height_mm: item.height_mm,
        width_mm: item.width_mm,
        weight_kg_m: item.weight_kg_m,
        material: item.material
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