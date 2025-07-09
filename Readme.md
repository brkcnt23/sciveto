📁 Monorepo Yapısı
Proje pnpm + turbo ile yönetilen bir monorepo yapısındadır.
İki ana uygulamadan oluşur:

apps/web → Nuxt 3 frontend (Vue tabanlı)

apps/api → NestJS backend (PostgreSQL + Prisma ile)

✅ Gereksinimler
Node.js (v18+ önerilir) → https://nodejs.org

pnpm → npm install -g pnpm

PostgreSQL (local ya da Docker üzerinden)

🔐 1. Ortam Değişkenlerini Ayarla (.env)
apps/api/.env dosyasını oluştur ve aşağıdaki gibi yapılandır:

env
Kopyala
Düzenle
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/sciveto_db
JWT_SECRET=your-super-secret-key
PORT=3001
yourpassword kısmı kendi PostgreSQL şifrenle değiştirilmeli

PostgreSQL kurulu değilse, aşağıdaki Docker komutu ile çalıştırabilirsin:

bash
Kopyala
Düzenle
docker run --name sciveto-db -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
📦 2. Tüm Bağımlılıkları Kur
Projeyi klonladıktan sonra kök dizinde:

bash
Kopyala
Düzenle
pnpm install
Bu işlem:

apps/web ve apps/api dâhil tüm paketlerin bağımlılıklarını kurar.

node_modules klasörlerini her dizine otomatik bağlar.

Ayrı ayrı pnpm install yapmana gerek yoktur.

🧱 3. Veritabanı Yapısını Oluştur (Prisma)
Eğer veritabanı boşsa veya tablo yoksa, otomatik oluşturmak için:

bash
Kopyala
Düzenle
pnpm db:push
Bu komut:

prisma/schema.prisma dosyasına göre tabloları oluşturur

Eğer veri yoksa bile sistem çalışır

Alternatif: pnpm db:migrate komutu ile migration da uygulanabilir.

🚀 4. Geliştirme Ortamını Başlat
Kök dizinden çalıştır:

bash
Kopyala
Düzenle
pnpm dev
Bu komut turbo sayesinde:

apps/web içinde Nuxt frontend’i başlatır

apps/api içinde NestJS backend’i başlatır

Portlar:

Frontend → http://localhost:3000

Backend → http://localhost:3001

📊 Ek Komutlar
Prisma Studio (veritabanını görsel düzenlemek için):

bash
Kopyala
Düzenle
pnpm db:studio
Tüm testleri çalıştırmak için:

bash
Kopyala
Düzenle
pnpm test
🧠 Önerilen Geliştirme Araçları
VSCode + Prisma / Tailwind / ESLint eklentileri

Docker Desktop (PostgreSQL için)

Git + GitHub CLI

💬 SSS
Q: PostgreSQL yüklü değil, yine de çalışabilir mi?
🅰 Evet. docker run ile hızlıca kurabilirsin veya ileride SQLite fallback desteği ekleyebilirsin.

Q: AI özellikleri nasıl çalışır?
🅰 GPT tabanlı sistemler için OpenAI API key entegrasyonu yapılmalı (örn: OPENAI_API_KEY .env içine). Şu an mock/test düzeyindedir.

