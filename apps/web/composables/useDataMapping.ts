// Orijinal JSON'dan stok JSON'u oluştur
export const useDataMapping = () => {
  
  const createStockMembran = (originalData: any[]) => {
    return originalData.map(item => ({
      name: `${item.brand} ${item.name}`,
      description: item.application,
      category: 'Membran',
      unit: 'm²',
      originalRef: item, // Orijinal dataya referans
      stockInfo: {
        defaultMinStock: 50,
        defaultMaxStock: 500,
        preferredSupplier: item.brand
      }
    }))
  }
  
  const createStockHalat = (originalData: any) => {
    return originalData.rows.map((item: any) => ({
      name: `${item.diameter_mm}mm ${item.material} Halat`,
      description: `${item.construction} construction`,
      category: 'Halat',
      unit: 'm',
      originalRef: item,
      stockInfo: {
        defaultMinStock: 100,
        defaultMaxStock: 1000
      }
    }))
  }
  
  const createStockMapa = (originalData: any) => {
    const stockItems: any[] = []
    
    // Halat Ucu Saplaması
    originalData.HALAT_UCU_SAPLAMASI.forEach((item: any) => {
      stockItems.push({
        name: `Halat Ucu Saplaması ${item.rope_mm}mm`,
        description: `${item.rope_mm}mm halat için`,
        category: 'Mapa',
        unit: 'adet',
        originalRef: item,
        stockInfo: {
          defaultMinStock: 10,
          defaultMaxStock: 100
        }
      })
    })
    
    return stockItems
  }
  
  const createStockPlaka = (originalData: any[]) => {
    return originalData.map(item => ({
      name: `${item.thickness || item.kalinlik}mm ${item.material || item.malzeme} Plaka`,
      description: item.description || item.aciklama || `${item.width || item.genislik}x${item.length || item.uzunluk}mm`,
      category: 'Plaka',
      unit: item.unit || 'adet',
      originalRef: item,
      stockInfo: {
        defaultMinStock: 20,
        defaultMaxStock: 200,
        preferredSupplier: item.supplier || item.tedarikci
      }
    }))
  }
  
  const createStockProfil = (originalData: any[]) => {
    return originalData.map(item => ({
      name: `${item.profile_type || item.profil_tipi} ${item.dimensions || item.olculer}`,
      description: item.description || item.aciklama || `${item.material || item.malzeme} profil`,
      category: 'Profil',
      unit: item.unit || 'm',
      originalRef: item,
      stockInfo: {
        defaultMinStock: 30,
        defaultMaxStock: 300,
        preferredSupplier: item.supplier || item.tedarikci
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
