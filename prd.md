================================================================
  PRD - GUDANG PENJUALAN BARANG EKSPOR

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. RINGKASAN PRODUK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nama Produk   : ExportHub — Gudang Penjualan Barang Ekspor
Tagline       : "Your Global Export Command Center"
Platform      : Web Application (Desktop-first, Responsive)
Tech Stack    : Vue.js 3 (Composition API), Vite, Pinia, Vue Router,
                Tailwind CSS, Chart.js / ApexCharts, shadcn-ui
Desain        : Web3-inspired — clean, neon accent, futuristic typography, light mode, shadcn-ui
Target User   : Eksportir, Manajer Gudang, Admin Penjualan

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. TUJUAN & SASARAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tujuan Bisnis:
  - Digitalisasi pengelolaan stok barang ekspor
  - Mempercepat proses order dan pengiriman internasional
  - Memberikan visibilitas real-time stok dan transaksi
  - Meminimalisir kesalahan manual pencatatan barang

KPI Keberhasilan:
  - Waktu proses order berkurang 40%
  - Akurasi stok mencapai 99%
  - Laporan ekspor dapat digenerate < 30 detik
  - Onboarding user baru < 15 menit

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. PENGGUNA & PERAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Role            Akses                          Deskripsi
──────────────  ─────────────────────────────  ──────────────────────────
Super Admin     Full access                    Kelola semua modul & user
Admin Gudang    Stok, Barang, Penerimaan       Kelola inventori gudang
Admin Penjualan Order, Invoice, Pelanggan      Proses penjualan ekspor
Manager         Dashboard, Laporan (read-only) Monitoring & analitik
Viewer          Dashboard saja                 Pantau ringkasan data

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. FITUR UTAMA (MODUL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────┐
│ M1 — DASHBOARD                                              │
├─────────────────────────────────────────────────────────────┤
│ • Ringkasan KPI: Total Stok, Nilai Inventori, Order Aktif,  │
│   Revenue Bulan Ini                                         │
│ • Grafik penjualan bulanan (line/bar chart)                 │
│ • Top 5 Barang Terlaris Ekspor                              │
│ • Notifikasi stok menipis / restock alert                   │
│ • Peta ekspor berdasarkan negara tujuan (map chart)         │
│ • Activity feed terbaru (order masuk, pengiriman, dll.)     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ M2 — MANAJEMEN BARANG (PRODUK)                              │
├─────────────────────────────────────────────────────────────┤
│ • CRUD Barang: nama, SKU, kategori, satuan, deskripsi       │
│ • Upload foto barang (multi-image)                          │
│ • HS Code (Harmonized System) untuk klasifikasi ekspor      │
│ • Harga jual (IDR & USD/EUR)                                │
│ • Status barang: aktif / non-aktif / discontinue            │
│ • Filter & search: kategori, negara tujuan, status          │
│ • Import barang via CSV/Excel                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ M3 — MANAJEMEN STOK (INVENTORI)                             │
├─────────────────────────────────────────────────────────────┤
│ • Stok per gudang / lokasi                                  │
│ • Penerimaan barang (Goods Receipt)                         │
│ • Pengeluaran barang (Goods Issue)                          │
│ • Transfer antar gudang                                     │
│ • Stok opname (stock count)                                 │
│ • Riwayat mutasi stok lengkap                               │
│ • Alert otomatis saat stok < minimum threshold              │
│ • Batch & Lot tracking (untuk barang dengan expired date)   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ M4 — MANAJEMEN PELANGGAN (BUYER)                            │
├─────────────────────────────────────────────────────────────┤
│ • CRUD data buyer internasional                             │
│ • Informasi: nama perusahaan, negara, alamat, kontak        │
│ • Dokumen buyer: NPWP, NIK, kontrak (upload file)           │
│ • Riwayat transaksi per buyer                               │
│ • Credit limit & payment terms per buyer                    │
│ • Segmentasi buyer: VIP, Regular, New                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ M5 — PENJUALAN & ORDER EKSPOR                               │
├─────────────────────────────────────────────────────────────┤
│ • Buat Sales Order (SO) dengan multi-item                   │
│ • Status order: Draft → Confirmed → Packing → Shipped →     │
│   Delivered → Completed / Cancelled                         │
│ • Pemilihan Incoterms (FOB, CIF, EXW, DDP, dll.)           │
│ • Integrasi dengan data stok (auto-deduct saat confirm)     │
│ • Generate Proforma Invoice otomatis                        │
│ • Generate Commercial Invoice & Packing List (PDF)          │
│ • Export ke format Excel/PDF                                │
│ • Filter order: status, tanggal, buyer, negara tujuan       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ M6 — PENGIRIMAN & LOGISTIK                                  │
├─────────────────────────────────────────────────────────────┤
│ • Manajemen Shipment per order                              │
│ • Data kapal/penerbangan: nomor voyage, nama kapal/maskapai │
│ • ETD / ETA                                                 │
│ • Nomor B/L (Bill of Lading) / AWB (Air Waybill)           │
│ • Status shipment tracking                                  │
│ • Dokumen ekspor: PEB, COO, Health Certificate (upload)     │
│ • Notifikasi pengiriman ke buyer (email/WhatsApp)           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ M7 — KEUANGAN & INVOICE                                     │
├─────────────────────────────────────────────────────────────┤
│ • Invoice final (Commercial Invoice)                        │
│ • Multi-currency: IDR, USD, EUR, SGD                        │
│ • Pembayaran: L/C, T/T, DP+Pelunasan                       │
│ • Status pembayaran: Unpaid / Partial / Paid                │
│ • Rekap penerimaan pembayaran                               │
│ • Laporan piutang (AR aging report)                         │
│ • Kurs mata uang (manual / API)                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ M8 — LAPORAN & ANALITIK                                     │
├─────────────────────────────────────────────────────────────┤
│ • Laporan Penjualan: per periode, per buyer, per negara     │
│ • Laporan Stok: posisi stok, mutasi, stok mati              │
│ • Laporan Pengiriman                                        │
│ • Laporan Keuangan: revenue, piutang, realisasi             │
│ • Export laporan: PDF & Excel                               │
│ • Dashboard analitik interaktif (filter dinamis)            │
│ • Laporan ekspor per HS Code (untuk keperluan bea cukai)    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ M9 — MANAJEMEN PENGGUNA & AKSES                             │
├─────────────────────────────────────────────────────────────┤
│ • CRUD User                                                 │
│ • Role-based Access Control (RBAC)                          │
│ • Audit log aktivitas user                                  │
│ • Login dengan email + password                             │
│ • 2FA (Two-Factor Authentication) opsional                  │
│ • Session management & logout                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ M10 — PENGATURAN SISTEM                                     │
├─────────────────────────────────────────────────────────────┤
│ • Data perusahaan (nama, logo, alamat, NPWP, SIUP)          │
│ • Konfigurasi gudang & lokasi                               │
│ • Master kategori barang                                    │
│ • Master negara tujuan ekspor                               │
│ • Template dokumen (Invoice, Packing List)                  │
│ • Notifikasi & alert settings                               │
│ • Backup & restore data                                     │
└─────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. DESAIN SISTEM (WEB3 CLEAN AESTHETIC)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5.1 Konsep Visual
  Gaya       : Web3 Clean — Dark Mode, Glassmorphism, Neon Accents
  Inspirasi  : Dashboard DeFi / Crypto Exchange tapi lebih formal
               dan profesional untuk konteks ekspor B2B

5.2 Color Palette
  Background Primary   : #0A0E1A  (Deep Navy Black)
  Background Secondary : #0F1629  (Dark Slate)
  Card / Glass         : rgba(255,255,255,0.04) + blur backdrop
  Border               : rgba(255,255,255,0.08)
  Accent Primary       : #00D4FF  (Cyan Electric)
  Accent Secondary     : #7B61FF  (Purple Violet)
  Accent Success       : #00FF88  (Neon Green)
  Accent Warning       : #FFB800  (Amber)
  Accent Danger        : #FF4D6A  (Neon Red)
  Text Primary         : #FFFFFF
  Text Secondary       : #8892A4
  Text Muted           : #4A5568

5.3 Typography
  Display / Heading    : "Space Grotesk" atau "Syne" — bold, futuristic
  Body / UI            : "DM Sans" atau "Plus Jakarta Sans"
  Monospace (kode/ID)  : "JetBrains Mono"
  Ukuran heading       : 32px / 24px / 20px / 16px
  Ukuran body          : 14px / 13px

5.4 Komponen UI
  Cards        : Glassmorphism (backdrop-filter: blur), subtle border
  Buttons      : Gradient neon, rounded-lg, glow effect on hover
  Tables       : Dark striped, sticky header, hover highlight row
  Badges/Tags  : Pill shape, warna sesuai status
  Charts       : Warna neon di atas dark background
  Sidebar      : Collapsible, dark dengan icon + label
  Input Fields : Dark border, focus glow cyan
  Modals       : Centered, glass overlay
  Toast/Notif  : Bottom-right, slide-in animation

5.5 Layout
  Struktur     : Sidebar (260px) + Main Content Area
  Sidebar      : Logo, nav menu, user profile, collapse toggle
  Header       : Breadcrumb, search global, notifikasi bell, avatar
  Content      : Padding 24px, grid 12-kolom
  Responsive   : Breakpoint 1280px (desktop), 768px (tablet),
                 375px (mobile — sidebar drawer)

5.6 Animasi & Interaksi
  - Page transition: fade + slide subtle
  - Card hover: subtle lift (translateY -2px) + shadow glow
  - Loading state: skeleton loaders dengan shimmer effect
  - Chart animasi: draw-on-load
  - Notifikasi: pulse ring pada icon bell saat ada notif baru
  - Staggered list render pada table/grid pertama kali load

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. ARSITEKTUR TEKNIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6.1 Frontend
  Framework     : Vue.js 3.x (Composition API + <script setup>)
  Build Tool    : Vite 5.x
  State Mgmt    : Pinia
  Router        : Vue Router 4.x
  UI Library    : Headless UI + custom komponen (bukan Vuetify/Quasar
                  agar desain fully custom)
  Styling       : Tailwind CSS 3.x + CSS custom variables
  Charts        : ApexCharts Vue
  Table         : TanStack Table (Vue adapter) atau custom
  Form          : VeeValidate + Zod schema
  HTTP Client   : Axios + interceptor untuk auth token
  Icons         : Lucide Vue / Heroicons
  Date/Time     : Day.js
  PDF Export    : jsPDF + html2canvas
  Excel Export  : SheetJS (xlsx)

6.2 Struktur Folder Vue.js
  src/
  ├── assets/          # Font, gambar, ikon
  ├── components/
  │   ├── common/      # Button, Input, Modal, Badge, Table, Card
  │   ├── charts/      # ChartLine, ChartBar, ChartDonut
  │   ├── layout/      # Sidebar, Header, Footer
  │   └── modules/     # Komponen per modul
  ├── composables/     # useAuth, useNotification, useExport, dll.
  ├── layouts/         # DefaultLayout, AuthLayout, PrintLayout
  ├── pages/           # Halaman per modul (router-based)
  │   ├── auth/
  │   ├── dashboard/
  │   ├── barang/
  │   ├── stok/
  │   ├── pelanggan/
  │   ├── order/
  │   ├── pengiriman/
  │   ├── keuangan/
  │   ├── laporan/
  │   ├── pengguna/
  │   └── pengaturan/
  ├── router/
  │   └── index.js     # Route definitions + navigation guards
  ├── stores/          # Pinia stores per domain
  ├── services/        # API service layer
  ├── utils/           # Helper functions
  └── types/           # TypeScript interfaces (opsional)

6.3 Backend (Rekomendasi)
  Framework     : Laravel 11 (PHP) atau Node.js (Express/Fastify)
  Database      : PostgreSQL
  Auth          : JWT + Refresh Token
  Storage       : S3-compatible (MinIO / AWS S3)
  API Style     : RESTful JSON API
  Dokumentasi   : Swagger/OpenAPI

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. USER STORIES PRIORITAS TINGGI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[US-001] Sebagai Admin Gudang, saya ingin melihat posisi stok 
         terkini agar saya tahu barang apa yang tersedia untuk 
         diorder.

[US-002] Sebagai Admin Penjualan, saya ingin membuat Sales Order 
         baru dengan memilih barang dan buyer agar proses order 
         tercatat secara digital.

[US-003] Sebagai Admin Penjualan, saya ingin generate Commercial 
         Invoice dalam format PDF agar bisa langsung dikirim ke 
         buyer.

[US-004] Sebagai Manager, saya ingin melihat dashboard penjualan 
         bulanan agar bisa memantau performa ekspor secara 
         real-time.

[US-005] Sebagai Admin Gudang, saya ingin mendapat notifikasi 
         otomatis ketika stok barang hampir habis agar bisa segera 
         melakukan reorder.

[US-006] Sebagai Super Admin, saya ingin mengelola hak akses user 
         agar setiap role hanya dapat mengakses fitur yang relevan.

[US-007] Sebagai Admin Penjualan, saya ingin melihat riwayat 
         transaksi per buyer agar bisa memahami pola pembelian.

[US-008] Sebagai Manager, saya ingin mengexport laporan penjualan 
         ke Excel agar bisa dipresentasikan ke manajemen.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. HALAMAN & ROUTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Path                          Nama Halaman
─────────────────────────────  ──────────────────────────────
/login                         Halaman Login
/                              Dashboard (redirect ke /dashboard)
/dashboard                     Dashboard Utama
/barang                        Daftar Barang
/barang/tambah                 Form Tambah Barang
/barang/:id                    Detail Barang
/barang/:id/edit               Edit Barang
/stok                          Overview Stok
/stok/penerimaan               Form Penerimaan Barang
/stok/pengeluaran              Form Pengeluaran Barang
/stok/mutasi                   Riwayat Mutasi Stok
/pelanggan                     Daftar Buyer
/pelanggan/tambah              Form Tambah Buyer
/pelanggan/:id                 Detail Buyer
/order                         Daftar Sales Order
/order/buat                    Buat Order Baru
/order/:id                     Detail Order
/pengiriman                    Daftar Shipment
/pengiriman/:id                Detail Shipment
/keuangan/invoice              Daftar Invoice
/keuangan/pembayaran           Rekap Pembayaran
/laporan/penjualan             Laporan Penjualan
/laporan/stok                  Laporan Stok
/laporan/keuangan              Laporan Keuangan
/pengguna                      Manajemen User
/pengaturan                    Pengaturan Sistem

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. ALUR PROSES UTAMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Alur Penjualan Ekspor:
  [1] Admin input/confirm stok tersedia
  [2] Buyer order → Admin buat Sales Order (Draft)
  [3] Admin konfirmasi SO → stok ter-reserve
  [4] Gudang lakukan packing → update status "Packing"
  [5] Barang dikirim → buat Shipment, input B/L atau AWB
  [6] Status order → "Shipped"
  [7] Barang tiba di tujuan → status "Delivered"
  [8] Invoice digenerate → dikirim ke buyer
  [9] Pembayaran diterima → status "Completed"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10. NON-FUNCTIONAL REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Performance  : First Contentful Paint < 1.5s, LCP < 2.5s
               Lazy loading per route, image optimization
Security     : JWT auth, HTTPS only, input sanitization,
               CSRF protection, rate limiting API
Availability : 99.5% uptime, maintenance window malam hari
Scalability  : Pagination semua list (max 50 item/halaman),
               query dioptimasi dengan indexing DB
Usability    : WCAG 2.1 Level AA, keyboard navigable
Browser      : Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
Bahasa UI    : Indonesia (default), English (opsional toggle)
Audit Log    : Semua aksi CRUD tercatat dengan user & timestamp

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11. ROADMAP PENGEMBANGAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FASE 1 — MVP (Bulan 1-2)
  ✓ Setup project Vue.js + Tailwind + Pinia
  ✓ Layout & Design System (komponen dasar)
  ✓ Autentikasi & Manajemen User
  ✓ Modul Barang (CRUD lengkap)
  ✓ Modul Stok (penerimaan, pengeluaran, mutasi)
  ✓ Dashboard basic

FASE 2 — Core Business (Bulan 3-4)
  ✓ Modul Pelanggan / Buyer
  ✓ Modul Order / Sales Order
  ✓ Modul Invoice & Keuangan
  ✓ Generate PDF (Invoice, Packing List)
  ✓ Notifikasi stok alert

FASE 3 — Advanced (Bulan 5-6)
  ✓ Modul Pengiriman / Logistik
  ✓ Modul Laporan & Analitik lengkap
  ✓ Export Excel / PDF laporan
  ✓ Dashboard peta ekspor (map chart)
  ✓ Optimasi performa & UX polish

FASE 4 — Enhancement (Bulan 7+)
  ○ Integrasi API kurs mata uang real-time
  ○ Notifikasi WhatsApp / Email otomatis
  ○ Mobile responsive optimization
  ○ Multi-bahasa (i18n)
  ○ API publik untuk integrasi ERP eksternal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12. RISIKO & MITIGASI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Risiko                          Mitigasi
──────────────────────────────  ─────────────────────────────────
Kompleksitas dokumen ekspor     Sediakan template dokumen bawaan,
yang bervariasi antar negara    field fleksibel & custom

Perubahan regulasi bea cukai    Modular HS Code & field dokumen
                                mudah dikonfigurasi admin

User resistance terhadap        UX intuitif, onboarding wizard,
sistem baru                     training & dokumentasi

Data stok tidak akurat          Audit log + stok opname berkala +
                                validasi real-time saat input

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  END OF DOCUMENT — ExportHub PRD v1.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
