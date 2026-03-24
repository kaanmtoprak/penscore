# PenScore

React ve Vite ile geliştirilmiş çok dilli (TR / EN) web arayüzü. Üretimde statik dosyalar **nginx** ile sunulur; Docker imajı bu yapı için hazırlanmıştır.

## Gereksinimler

- **Node.js 22.x** ([`engines`](package.json) ile tanımlı)
- **npm** (projede `package-lock.json` kullanılıyor; `npm ci` önerilir)

## Yerel kurulum

```bash
git clone <repo-url> cyber
cd cyber
npm ci
```

### Geliştirme sunucusu

```bash
npm run dev
```

Varsayılan adres: [http://localhost:5173](http://localhost:5173) (Vite).

### Üretim derlemesi (yerel)

```bash
npm run build
```

Çıktı `dist/` klasöründe oluşur.

### Üretim önizlemesi (Vite)

```bash
npm run start
```

`vite preview` ile `dist` önizlenir.

---

## Docker ile derleme ve çalıştırma

İmaj iki aşamalıdır: önce Node ile `npm run build`, sonra **nginx:alpine** ile `dist` sunulur. React Router için nginx şablonunda `try_files` ile SPA yönlendirmesi tanımlıdır.

### İmajı oluşturma

Proje kökünde:

```bash
docker build -t penscore .
```

Önbelleği sıfırlamak istersen:

```bash
docker build --no-cache -t penscore .
```

### Konteyneri çalıştırma

Varsayılan dinleme portu **8080** (`Dockerfile` içinde `ENV PORT=8080`):

```bash
docker run --rm -p 8080:8080 penscore
```

Tarayıcı: [http://localhost:8080](http://localhost:8080)

### Farklı port (PaaS / bulut)

Bazı platformlar `PORT` ortam değişkeni verir. nginx şablonu `${PORT}` ile uyumludur; publish ettiğin host portu ile aynı olmalıdır:

```bash
docker run --rm -e PORT=3000 -p 3000:3000 penscore
```

### Sağlık kontrolü

İmajda `HEALTHCHECK` tanımlıdır; konteyner orchestrator’ları (ör. Kubernetes) bunu kullanabilir.

---

## Proje yapısı (kısa)

| Yol | Açıklama |
|-----|----------|
| `src/` | React bileşenleri, sayfalar, stiller |
| `messages/` | i18n çevirileri (`en.json`, `tr.json`) |
| `public/` | Statik varlıklar (köke kopyalanır) |
| `nginx/default.conf.template` | Üretim nginx yapılandırması (şablon) |

---

## Notlar

- **Linux / Docker:** SCSS içinde dosya yolları gerçek klasör adlarıyla aynı olmalıdır (büyük/küçük harf duyarlılığı).
- Yerelde sadece statik hosting kullanacaksan `dist/` içeriğini herhangi bir statik sunucuya atıp tüm rotalar için `index.html` fallback kullanman gerekir (Docker nginx şablonu bunu zaten yapar).
