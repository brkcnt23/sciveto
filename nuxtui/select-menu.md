# USelectMenu (SelectMenu)

Gelişmiş ve arama destekli bir select (combobox) bileşeni.

## Tanıtım

`USelectMenu` bileşeni, Reka UI'nin Combobox yapısını kullanarak arama ve çoklu seçime olanak tanır. Standart `<Select>` bileşenine göre daha gelişmiş özellikler sunar ve `InputMenu` benzeri ama seçimin select menüsünde gerçekleştiği bir yapıya sahiptir :contentReference[oaicite:1]{index=1}.

---

## Props ve Özellikler

### `items`
- Dizi formatında veri kabul eder: `string`, `number`, `boolean`, veya nesne (`object`).
- Nesne struct:
  - `label?: string`
  - `type?: "label" | "separator" | "item"`
  - `icon?: string`
  - `avatar?: AvatarProps`
  - `chip?: ChipProps`
  - `disabled?: boolean`
  - `onSelect?(e: Event): void`
  - `class?: any`
  - `ui?: { ... }` (özelleştirilmiş sınıflar) :contentReference[oaicite:2]{index=2}
- Ayrı gruplar için dizi içinde dizi (`[[], []]`) kullanılabilir :contentReference[oaicite:3]{index=3}.

### `v-model` / `default-value`
- Tek seçim modunda `v-model="value"` şeklinde kullanılır.
- Çoklu seçimde (`:multiple`) `value` dizisi olmalı.
- Nesne listesi kullanılıyorsa, `v-model` ile tüm nesne aktarılır; `value-key` kullanılarak sadece belirli bir alan bağlanabilir :contentReference[oaicite:4]{index=4}.

### `multiple`
- `true` olarak ayarlanırsa çoklu seçim aktif olur.
- Arabelirilen seçimler tetikleyicide virgülle ayrılmış şekilde gösterilir.

### `placeholder`
- Arama çubuğu veya placeholder metni için kullanılır.

### `search-input`
- Özelleştirme opsiyonları: `placeholder`, `icon`, vs.
- `false` atanırsa arama çubuğu gizlenebilir :contentReference[oaicite:5]{index=5}.

### `content`
- Menü içeriğinin hizalanması, pozisyonu (`side`), offset (`sideOffset`) kontrol edilebilir :contentReference[oaicite:6]{index=6}.

### `arrow`, `color`, `variant`, `size`
- `arrow`: ok ikonunu gösterir.
- `color`: odaklandığında kullanılan renk.
- `variant`: bileşen variantı (`subtle`, vs.).
- `size`: boyutlandırma opsiyonu (`sm`, `md`, `lg`, `xl`) :contentReference[oaicite:7]{index=7}.

### İkonlar
- `icon`: baş ikon
- `trailing-icon`: varsayılan `i-lucide-chevron-down`, değiştirilebilir.
- `selected-icon`: seçim işareti ikonu, varsayılan `i-lucide-check`, değiştirilebilir :contentReference[oaicite:8]{index=8}.

### `avatar`
- Trigger alanına avatar yerleştirmek için kullanılır.
- `avatar.src`, `avatar.alt` gibi alanlar kullanılır :contentReference[oaicite:9]{index=9}.

### `loading`, `loading-icon`
- `loading`: bileşen yükleme durumunu gösterir.
- `loading-icon`: varsayılan `i-lucide-loader-circle`, değiştirilebilir :contentReference[oaicite:10]{index=10}.

### `disabled`
- `true` ise kullanım engellenir.

---

## Kullanım Gösterimleri

### Tekli Seçim

```vue
<USelectMenu v-model="value" :items="items" class="w-48" />
Çoklu Seçim

<USelectMenu v-model="value" multiple :items="items" class="w-48" />
Nesne Bazlı Veri & value-key

<USelectMenu v-model="value" value-key="id" :items="items" class="w-48" />
Arama Giriş Özelleştirme
<USelectMenu
  v-model="value"
  :search-input="{ placeholder: 'Filter...', icon: 'i-lucide-search' }"
  :items="items"
  class="w-48"
/>
Menü İçeriği Pozisyonlama

<USelectMenu
  v-model="value"
  :content="{ align: 'center', side: 'bottom', sideOffset: 8 }"
  :items="items"
  class="w-48"
/>
İkon ve Avatar Kullanımı

<USelectMenu
  v-model="value"
  icon="i-lucide-search"
  trailing-icon="i-lucide-arrow-down"
  selected-icon="i-lucide-flame"
  :avatar="{ src: 'https://github.com/nuxt.png' }"
  :items="items"
  class="w-48"
/>
Yükleme Durumu

<USelectMenu v-model="value" loading :items="items" class="w-48" />