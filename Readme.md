# 📦 Sciveto – Yapay Zekâ Destekli Üretim ve Proje Yönetim Sistemi

Sciveto, üretim ve tedarik süreçlerini uçtan uca yönetmek için geliştirilmiş bir monorepo yapılı sistemdir.\
Bu proje; teklif yönetimi, proje takibi, stok kontrolü, üretim planlama, sevkiyat ve raporlama süreçlerini kapsar.\
Vue (Nuxt 3), NestJS, Prisma ve PostgreSQL ile geliştirilmiştir.

---

## 🔀 Teknolojiler

- 🌐 **Frontend:** Nuxt 3 (Vue 3, Tailwind, Pinia)
- ⚙️ **Backend:** NestJS + Prisma
- 🧠 **Yapay Zeka:** OpenAI (GPT) – Entegrasyon hazır
- 📂 **Veritabanı:** PostgreSQL
- 📦 **Paket Yönetimi:** pnpm
- 🧪 **Monorepo:** Turbo

---

## ⚙️ Gereksinimler

- Node.js (18+)
- pnpm → `npm install -g pnpm`
- PostgreSQL (veya Docker)
- Git

---

## 🚀 Kurulum Adımları (Yeni Bir Bilgisayarda)

### 1. Reposu klonla

```
git clone https://github.com/kullaniciadi/sciveto.git
cd sciveto
```

### 2. Ortam değişkenlerini ayarla

`apps/api/.env` dosyasını oluştur ve şuna benzer yap:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/sciveto_db
JWT_SECRET=your-super-secret-key
PORT=3001
```

PostgreSQL yoksa Docker ile hızlıca başlatabilirsin:

```
docker run --name sciveto-db -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
```

### 3. Bağımlılıkları yükle

```
pnpm install
```

> Bu komut tüm monorepo paketlerini (`apps/web`, `apps/api` vb.) otomatik olarak kurar.

### 4. Veritabanı tablolarını oluştur

```
pnpm db:push
```

> Bu komut `prisma/schema.prisma` dosyasına göre veritabanında gerekli tabloları oluşturur.\
> Veritabanı boş olsa bile uygulama çalışır.

### 5. Geliştirme ortamını başlat

```
pnpm dev
```

Frontend (Nuxt): [http://localhost:3000](http://localhost:3000)\
Backend (NestJS): [http://localhost:3001](http://localhost:3001)

---

## 📊 Ekstra Komutlar

- Prisma Studio (veritabanı arayüzü):

  ```
  pnpm db:studio
  ```

- Testleri çalıştır:

  ```
  pnpm test
  ```

- Lint ve format:

  ```
  pnpm lint
  pnpm format
  ```

---

## 🧠 AI Entegrasyonu (Opsiyonel)

- `.env` içine `OPENAI_API_KEY=...` gibi bir değer eklenebilir.
- Her modülde `AI Insight` kartları, otomatik öneriler ve risk analizleri planlanmıştır.
- API maliyetini azaltmak için GPT-3.5 kullanımı önerilir.

---

## 📝 Notlar

- Bu proje henüz erken geliştirme aşamasındadır.
- Proje yönetimi, üretim takibi, stok & teklif sistemleri AI-first UX anlayışıyla geliştirilmektedir.
- Her modül kendi içinde AI öneri kartları ve içgörülerle desteklenmektedir.

---

## 👨‍💼 Katkıda Bulunmak

Pull Request göndermeden önce lütfen `dev` branch’i üzerinden çatallayınız.

---

## 📄 Lisans

Bu proje özel lisanslıdır. Detaylı bilgi için proje sahibine ulaşınız.

