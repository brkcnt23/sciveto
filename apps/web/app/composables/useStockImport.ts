// Import logic for stock management
import { ref, reactive } from 'vue'
import { useDataMapping } from './useDataMapping'

export const useStockImport = () => {
  const { createStockMembran, createStockHalat, createStockMapa, createStockPlaka, createStockProfil } = useDataMapping()
  
  const importing = reactive({
    membran: false,
    halat: false,
    mapa: false,
    plaka: false,
    profil: false
  })
  
  const importingAll = ref(false)
  
  const importProgress = reactive({
    show: false,
    value: 0,
    max: 100,
    message: ''
  })
  
  const counts = reactive({
    membran: 0,
    halat: 0,
    mapa: 0,
    plaka: 0,
    profil: 0
  })
  
  // JSON dosyalarını oku
  const loadOriginalData = async (type: string) => {
    try {
      const response = await fetch(`/data/original/${type}.json`)
      if (!response.ok) throw new Error(`${type} verisi yüklenemedi`)
      return await response.json()
    } catch (error) {
      console.error(`${type} yükleme hatası:`, error)
      throw error
    }
  }
  
  // Stok verisini kaydet
  const saveStockData = async (type: string, data: any[]) => {
    try {
      // Bu kısım backend API'sine gönderilecek
      // Şimdilik localStorage'a kaydet
      localStorage.setItem(`stock_${type}`, JSON.stringify(data))
      return true
    } catch (error) {
      console.error(`${type} kaydetme hatası:`, error)
      throw error
    }
  }
  
  const importMembran = async () => {
    importing.membran = true
    try {
      importProgress.show = true
      importProgress.message = 'Membran verileri yükleniyor...'
      importProgress.value = 25
      
      const originalData = await loadOriginalData('membran')
      importProgress.value = 50
      importProgress.message = 'Membran verileri dönüştürülüyor...'
      
      const stockData = createStockMembran(originalData)
      importProgress.value = 75
      importProgress.message = 'Membran verileri kaydediliyor...'
      
      await saveStockData('membran', stockData)
      counts.membran = stockData.length
      importProgress.value = 100
      importProgress.message = `${stockData.length} membran ürünü başarıyla import edildi!`
      
      setTimeout(() => {
        importProgress.show = false
      }, 2000)
      
    } catch (error) {
      importProgress.message = 'Membran import hatası!'
      throw error
    } finally {
      importing.membran = false
    }
  }
  
  const importHalat = async () => {
    importing.halat = true
    try {
      importProgress.show = true
      importProgress.message = 'Halat verileri yükleniyor...'
      importProgress.value = 25
      
      const originalData = await loadOriginalData('halat')
      importProgress.value = 50
      importProgress.message = 'Halat verileri dönüştürülüyor...'
      
      const stockData = createStockHalat(originalData)
      importProgress.value = 75
      importProgress.message = 'Halat verileri kaydediliyor...'
      
      await saveStockData('halat', stockData)
      counts.halat = stockData.length
      importProgress.value = 100
      importProgress.message = `${stockData.length} halat ürünü başarıyla import edildi!`
      
      setTimeout(() => {
        importProgress.show = false
      }, 2000)
      
    } catch (error) {
      importProgress.message = 'Halat import hatası!'
      throw error
    } finally {
      importing.halat = false
    }
  }
  
  const importMapa = async () => {
    importing.mapa = true
    try {
      importProgress.show = true
      importProgress.message = 'Mapa verileri yükleniyor...'
      importProgress.value = 25
      
      const originalData = await loadOriginalData('mapa')
      importProgress.value = 50
      importProgress.message = 'Mapa verileri dönüştürülüyor...'
      
      const stockData = createStockMapa(originalData)
      importProgress.value = 75
      importProgress.message = 'Mapa verileri kaydediliyor...'
      
      await saveStockData('mapa', stockData)
      counts.mapa = stockData.length
      importProgress.value = 100
      importProgress.message = `${stockData.length} mapa ürünü başarıyla import edildi!`
      
      setTimeout(() => {
        importProgress.show = false
      }, 2000)
      
    } catch (error) {
      importProgress.message = 'Mapa import hatası!'
      throw error
    } finally {
      importing.mapa = false
    }
  }
  
  const importAll = async () => {
    importingAll.value = true
    try {
      await importMembran()
      await importHalat()
      await importMapa()
      
      importProgress.message = 'Tüm veriler başarıyla import edildi!'
      importProgress.value = 100
      
    } catch (error) {
      importProgress.message = 'Toplu import hatası!'
      throw error
    } finally {
      importingAll.value = false
    }
  }
  
  // Sayıları yükle
  const loadCounts = async () => {
    try {
      const membranData = localStorage.getItem('stock_membran')
      const halatData = localStorage.getItem('stock_halat')
      const mapaData = localStorage.getItem('stock_mapa')
      
      counts.membran = membranData ? JSON.parse(membranData).length : 0
      counts.halat = halatData ? JSON.parse(halatData).length : 0
      counts.mapa = mapaData ? JSON.parse(mapaData).length : 0
    } catch (error) {
      console.error('Count yükleme hatası:', error)
    }
  }
  
  return {
    importing,
    importingAll,
    importProgress,
    counts,
    importMembran,
    importHalat,
    importMapa,
    importAll,
    loadCounts
  }
}
