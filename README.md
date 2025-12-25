
√ Would you like to use TypeScript? ... Yes
√ Which linter would you like to use? » ESLint
√ Would you like to use React Compiler? ... No 
√ Would you like to use Tailwind CSS? ...  Yes
√ Would you like your code inside a `src/` directory? ...  Yes
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to customize the import alias (`@/*` by default)? ...  Yes
√ What import alias would you like configured? ... @/*


yapı:

└── src
  
    ├── types   
    │   └── product.ts                        # Ürün domain’ine ait TypeScript tipleri (Product, Price, Rating vb.)
    ├── store
    │   ├── theme  
    │   │   └── theme.store.ts                # Dark / light tema state’ini yöneten Zustand store
    │   └── favorites
    │       ├── favorites.selectors.ts        # Favorites store için memoized selector fonksiyonları
    │       ├── favorites.store.ts            # Favori ürünleri yöneten Zustand store (add/remove/toggle)
    │       └── favorites.types.ts            # Favorites store’a ait tipler ve interface’ler
    ├── mocks
    │   └── products.json                     # Mock API yerine kullanılan statik ürün datası
    ├── lib
    │   ├── mappers
    │   │   └── productMapper.ts              # API / mock verisini UI’da kullanılacak modele dönüştüren mapper
    │   ├── i18n
    │   │   ├── getDictionaries.ts            # Locale’e göre doğru dil sözlüğünü yükleyen helper
    │   │   ├── i18n-config.ts                # Desteklenen diller, default locale ve routing ayarları
    │   │   ├── types.ts                      # i18n sözlük tipleri ve ortak type tanımları
    │   │   └── dictionaries
    │   │       ├── en.json                   # İngilizce dil sözlüğü
    │   │       └── tr.json                   # Türkçe dil sözlüğü
    │   └── api
    │       ├── products.ts                   # Ürün datasını getiren mock API fonksiyonları
    │       └── types.ts                      # API response ve request tipleri
    ├── components
    │   └── molecules
    │       ├── LanguageSwitcher.tsx          # Aktif dili değiştirmeye yarayan UI bileşeni
    │       ├── ProductCard.tsx               # Ürün listelemede kullanılan kart bileşeni
    │       └── SearchInput.tsx               # Ürün arama için kullanılan input component’i
    └── app
        ├── error.tsx                         # Global error boundary (runtime hataları yakalar)
        ├── globals.css                       # Tailwind ve global stil tanımları
        ├── layout.tsx                        # Root layout (HTML, body, theme, providers)
        ├── not-found.tsx                     # 404 sayfası
        ├── page.tsx                          # Default (root) landing page
        ├── robots.ts                         # SEO için robots.txt konfigürasyonu
        ├── sitemap.ts                        # SEO için otomatik sitemap üretimi
        └── [locale]
            ├── layout.tsx                    # Locale bazlı layout (i18n dictionary provider içerir)
            ├── page.tsx                      # Locale’e bağlı ana sayfa (örn: /tr, /en)
            ├── products
            │   └── [slug]
            │       ├── metadata.ts           # Ürün detay sayfası için dinamik SEO metadata
            │       └── page.tsx              # Ürün detay sayfası (SSR)
            └── favorites
                ├── FavoritesView.tsx         # Favori ürünleri listeleyen client component
                └── page.tsx                  # Favoriler sayfası route’u




1️⃣ Internationalization (i18n)

Amaç: URL tabanlı dil yönetimi (/tr, /en), Metinlerin merkezi ve type-safe yönetimi

src/lib/i18n/
├── i18n-config.ts      → locale listesi & default locale 
├── getDictionaries.ts → dynamic dictionary loader (dinamik sözlük yükleyici)
├── types.ts            → Dictionary type contract 
└── dictionaries/
    ├── tr.json
    └── en.json

Neden Bu Yaklaşım?

-next-intl gibi heavy bir bağımlılık yok
-SSR/SSG uyumlu
-Tree-shakable
-Dictionary’ler build-time’da ayrıştırılabilir

2️⃣ Routing + Rendering Kararları

sayfa                             rendering                  neden 
/[locale]                            SSG	          SEO + statik içerik  
/products/[slug(ürün key)]	  ISR (revalidate: 60)  	Ürün değişebilir
/favorites	                     Client-side	          Kişisel veri
/	                               Redirect	             Default locale


3️⃣ Mock API + Mapper Katmanı

Amaç: Gerçek backend varmış gibi çalışma, UI’yı API contract’ından izole etmek

src/lib/api/
├── products.ts   → fetchProducts, fetchProductBySlug
├── types.ts      → ApiProduct contract

src/lib/mappers/
└── productMapper.ts

Mapper Neden Önemli?

-API değişirse UI kırılmaz
-Locale bazlı field mapping burada yapılır
-UI her zaman aynı Product tipini kullanır

4️⃣ State Management – Zustand (Favorites)

Amaç: Global ama minimal state, Normalize edilmiş yapı, Test edilebilir business logic

src/store/favorites/
├── favorites.store.ts
├── favorites.types.ts
└── favorites.selectors.ts

path: http://localhost:3003/{lang}/favorites

Özellikler

-ids + entities pattern
-Selector kullanımı → re-render minimizasyonu
-UI bağımsız business logic

5️⃣ Product List & Detail Pages

Product List

-SSG
-Search URL sync 
-Lazy loaded images
-Reusable ProductCard

Product Detail

-ISR
-Dynamic metadata
-JSON-LD (Product schema)

6️⃣ Dark Mode

-Zustand theme store
-Tailwind dark: variant
-suppressHydrationWarning ile hydration safe

7️⃣ SEO & Accessibility

SEO

-Dynamic metadata (generateMetadata)
-OpenGraph & Twitter Cards
-JSON-LD (Product, CollectionPage)
-robots.ts
-sitemap.ts
-Custom 404 & 500

Accessibility

-Semantic HTML
-aria-label
-Keyboard accessible buttons
-Image alt texts

8️⃣Animations – Framer Motion

favori butonu ve product card'a hover ve tap animasyonları eklendi

9️⃣genel  

- kod stili basit tutuldu 
- sayfalar arası geçiş kolaylığı için topbar eklendi
- backend apileri kolayca bağlanabilecek şekilde yapıldı
- 

