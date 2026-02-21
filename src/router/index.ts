import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/auth/LoginPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/pages/dashboard/DashboardPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/barang',
      name: 'barang',
      component: () => import('@/pages/barang/BarangListPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/barang/tambah',
      name: 'barang-tambah',
      component: () => import('@/pages/barang/BarangFormPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/barang/:id',
      name: 'barang-detail',
      component: () => import('@/pages/barang/BarangDetailPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/barang/:id/edit',
      name: 'barang-edit',
      component: () => import('@/pages/barang/BarangFormPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/stok',
      name: 'stok',
      component: () => import('@/pages/stok/StokOverviewPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/stok/penerimaan',
      name: 'stok-penerimaan',
      component: () => import('@/pages/stok/StokPenerimaanPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/stok/pengeluaran',
      name: 'stok-pengeluaran',
      component: () => import('@/pages/stok/StokPengeluaranPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/stok/mutasi',
      name: 'stok-mutasi',
      component: () => import('@/pages/stok/StokMutasiPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pelanggan',
      name: 'pelanggan',
      component: () => import('@/pages/pelanggan/PelangganListPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pelanggan/tambah',
      name: 'pelanggan-tambah',
      component: () => import('@/pages/pelanggan/PelangganFormPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pelanggan/:id',
      name: 'pelanggan-detail',
      component: () => import('@/pages/pelanggan/PelangganDetailPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/pages/order/OrderListPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/order/buat',
      name: 'order-buat',
      component: () => import('@/pages/order/OrderFormPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/order/:id',
      name: 'order-detail',
      component: () => import('@/pages/order/OrderDetailPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pengiriman',
      name: 'pengiriman',
      component: () => import('@/pages/pengiriman/PengirimanListPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pengiriman/:id',
      name: 'pengiriman-detail',
      component: () => import('@/pages/pengiriman/PengirimanDetailPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/keuangan/invoice',
      name: 'keuangan-invoice',
      component: () => import('@/pages/keuangan/InvoiceListPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/keuangan/pembayaran',
      name: 'keuangan-pembayaran',
      component: () => import('@/pages/keuangan/PembayaranPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/laporan/penjualan',
      name: 'laporan-penjualan',
      component: () => import('@/pages/laporan/LaporanPenjualanPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/laporan/stok',
      name: 'laporan-stok',
      component: () => import('@/pages/laporan/LaporanStokPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/laporan/keuangan',
      name: 'laporan-keuangan',
      component: () => import('@/pages/laporan/LaporanKeuanganPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pengguna',
      name: 'pengguna',
      component: () => import('@/pages/pengguna/PenggunaListPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pengaturan',
      name: 'pengaturan',
      component: () => import('@/pages/pengaturan/PengaturanPage.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

export default router
