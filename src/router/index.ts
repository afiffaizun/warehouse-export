import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

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
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/dashboard'
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/pages/dashboard/DashboardPage.vue')
        },
        {
          path: 'barang',
          name: 'barang',
          component: () => import('@/pages/barang/BarangListPage.vue')
        },
        {
          path: 'barang/tambah',
          name: 'barang-tambah',
          component: () => import('@/pages/barang/BarangFormPage.vue')
        },
        {
          path: 'barang/:id',
          name: 'barang-detail',
          component: () => import('@/pages/barang/BarangDetailPage.vue')
        },
        {
          path: 'barang/:id/edit',
          name: 'barang-edit',
          component: () => import('@/pages/barang/BarangFormPage.vue')
        },
        {
          path: 'stok',
          name: 'stok',
          component: () => import('@/pages/stok/StokOverviewPage.vue')
        },
        {
          path: 'stok/penerimaan',
          name: 'stok-penerimaan',
          component: () => import('@/pages/stok/StokPenerimaanPage.vue')
        },
        {
          path: 'stok/pengeluaran',
          name: 'stok-pengeluaran',
          component: () => import('@/pages/stok/StokPengeluaranPage.vue')
        },
        {
          path: 'stok/mutasi',
          name: 'stok-mutasi',
          component: () => import('@/pages/stok/StokMutasiPage.vue')
        },
        {
          path: 'pelanggan',
          name: 'pelanggan',
          component: () => import('@/pages/pelanggan/PelangganListPage.vue')
        },
        {
          path: 'pelanggan/tambah',
          name: 'pelanggan-tambah',
          component: () => import('@/pages/pelanggan/PelangganFormPage.vue')
        },
        {
          path: 'pelanggan/:id',
          name: 'pelanggan-detail',
          component: () => import('@/pages/pelanggan/PelangganDetailPage.vue')
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('@/pages/order/OrderListPage.vue')
        },
        {
          path: 'order/buat',
          name: 'order-buat',
          component: () => import('@/pages/order/OrderFormPage.vue')
        },
        {
          path: 'order/:id',
          name: 'order-detail',
          component: () => import('@/pages/order/OrderDetailPage.vue')
        },
        {
          path: 'pengiriman',
          name: 'pengiriman',
          component: () => import('@/pages/pengiriman/PengirimanListPage.vue')
        },
        {
          path: 'pengiriman/:id',
          name: 'pengiriman-detail',
          component: () => import('@/pages/pengiriman/PengirimanDetailPage.vue')
        },
        {
          path: 'keuangan/invoice',
          name: 'keuangan-invoice',
          component: () => import('@/pages/keuangan/InvoiceListPage.vue')
        },
        {
          path: 'keuangan/pembayaran',
          name: 'keuangan-pembayaran',
          component: () => import('@/pages/keuangan/PembayaranPage.vue')
        },
        {
          path: 'laporan/penjualan',
          name: 'laporan-penjualan',
          component: () => import('@/pages/laporan/LaporanPenjualanPage.vue')
        },
        {
          path: 'laporan/stok',
          name: 'laporan-stok',
          component: () => import('@/pages/laporan/LaporanStokPage.vue')
        },
        {
          path: 'laporan/keuangan',
          name: 'laporan-keuangan',
          component: () => import('@/pages/laporan/LaporanKeuanganPage.vue')
        },
        {
          path: 'pengguna',
          name: 'pengguna',
          component: () => import('@/pages/pengguna/PenggunaListPage.vue')
        },
        {
          path: 'pengaturan',
          name: 'pengaturan',
          component: () => import('@/pages/pengguna/PenggunaListPage.vue')
        }
      ]
    }
  ]
})

export default router
