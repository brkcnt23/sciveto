// apps/web/types/category.ts
export interface CategoryProperty {
  id: string
  name: string
  type: 'text' | 'number' | 'select' | 'boolean' | 'textarea'
  required: boolean
  options?: string[] // For select type
  placeholder?: string
  unit?: string // For number fields (mm, kg, m², etc.)
}

export interface Category {
  id: string
  name: string
  description?: string
  color: string
  icon: string
  isDefault: boolean // Sistem kategorileri vs özel kategoriler
  properties: CategoryProperty[]
  createdAt: Date
  updatedAt: Date
  userId?: string // Kim oluşturdu
}

export interface StockItemData {
  id: string
  name: string
  description?: string
  categoryId: string
  unit: string
  currentStock: number
  minStock: number
  maxStock?: number
  properties: Record<string, any> // Kategoriye özel özellikler
  createdAt: Date
  updatedAt: Date
}

// Hazır kategori templates
export interface CategoryTemplate {
  name: string
  description: string
  color: string
  icon: string
  properties: Omit<CategoryProperty, 'id'>[]
}

export const DEFAULT_CATEGORY_TEMPLATES: CategoryTemplate[] = [
  {
    name: 'Membran',
    description: 'Membran ürünleri ve aksesuarları',
    color: '#3B82F6',
    icon: 'i-lucide-layers',
    properties: [
      { name: 'Marka', type: 'text', required: true, placeholder: 'FERRARI, MEHLER, SIOEN...' },
      { name: 'Seri', type: 'text', required: false, placeholder: 'Biobrane, Mehatop...' },
      { name: 'Ağırlık', type: 'number', required: false, unit: 'g/m²', placeholder: '950' },
      { name: 'Genişlik', type: 'number', required: false, unit: 'cm', placeholder: '267' },
      { name: 'Garanti', type: 'number', required: false, unit: 'yıl', placeholder: '10' },
      { name: 'Uygulama', type: 'textarea', required: false, placeholder: 'Gaz tutucu membranlar - S2 PVDF' }
    ]
  },
  {
    name: 'Halat',
    description: 'Çelik ve paslanmaz halat çeşitleri',
    color: '#10B981',
    icon: 'i-lucide-cable',
    properties: [
      { name: 'Yapı', type: 'select', required: true, options: ['6x19', '7x7', '7x19', '1x19', '6x36 WS'] },
      { name: 'Malzeme', type: 'select', required: true, options: ['Carbon Steel', 'AISI 316', 'AISI 304'] },
      { name: 'Çekirdek', type: 'select', required: false, options: ['FC', 'IWRC', 'WSC', '—'] },
      { name: 'Çap', type: 'number', required: true, unit: 'mm', placeholder: '8' },
      { name: 'Kopma Kuvveti', type: 'number', required: false, unit: 'kN', placeholder: '40.8' },
      { name: 'Standart', type: 'text', required: false, placeholder: 'EN 12385-4, DIN 3060' }
    ]
  },
  {
    name: 'Profil',
    description: 'Çelik profil çeşitleri',
    color: '#F59E0B',
    icon: 'i-lucide-box',
    properties: [
      { name: 'Tip', type: 'select', required: true, options: ['HEA', 'HEB', 'IPE', 'IPN', 'UPN', 'RHS', 'SHS'] },
      { name: 'Boyut', type: 'text', required: true, placeholder: '100, 120x80x5, 40x40x3' },
      { name: 'Yükseklik', type: 'number', required: false, unit: 'mm', placeholder: '96' },
      { name: 'Genişlik', type: 'number', required: false, unit: 'mm', placeholder: '100' },
      { name: 'Ağırlık', type: 'number', required: false, unit: 'kg/m', placeholder: '16.7' },
      { name: 'Malzeme', type: 'select', required: false, options: ['S235JR', 'S275JR', 'S355JR'] }
    ]
  },
  {
    name: 'Plaka',
    description: 'Çelik plaka çeşitleri',
    color: '#8B5CF6',
    icon: 'i-lucide-square',
    properties: [
      { name: 'Malzeme', type: 'select', required: true, options: ['S235JR', 'S275JR', 'AISI 304', 'AISI 316L', 'DX51D+Z'] },
      { name: 'Kalınlık', type: 'number', required: true, unit: 'mm', placeholder: '2' },
      { name: 'Genişlik', type: 'number', required: false, unit: 'mm', placeholder: '1500' },
      { name: 'Uzunluk', type: 'number', required: false, unit: 'mm', placeholder: '3000' },
      { name: 'Standart', type: 'text', required: false, placeholder: 'EN 10025-2' }
    ]
  },
  {
    name: 'Mapa',
    description: 'Halat ucu aksesuarları',
    color: '#EC4899',
    icon: 'i-lucide-link',
    properties: [
      { name: 'Tip', type: 'select', required: true, options: ['Halat Ucu Saplaması', 'Halat Ucu Çatalı', 'Halat Ucu Mapası'] },
      { name: 'Halat Çapı', type: 'number', required: true, unit: 'mm', placeholder: '8' },
      { name: 'Malzeme', type: 'select', required: false, options: ['Carbon Steel', 'Stainless Steel'] },
      { name: 'Diş', type: 'text', required: false, placeholder: 'M14' },
      { name: 'A Boyutu', type: 'number', required: false, unit: 'mm', placeholder: '16' }
    ]
  }
]