import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          Sistem Informasi Perpustakaan SMA
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Kelola Katalog & Stok Buku Perpustakaan Lebih Cepat
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
          <strong>PustakaKu</strong> menggantikan pencatatan buku manual di perpustakaan sekolah.
          Pantau ketersediaan eksemplar buku secara langsung, cari koleksi berdasarkan judul
          atau penulis, dan tambahkan data koleksi buku baru dalam hitungan detik.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/buku"
            className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Lihat Daftar Buku &rarr;
          </Link>
          <Link
            href="/buku/baru"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            + Tambah Buku Baru
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-gray-100 pt-8 sm:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Pencarian Cepat</h2>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              Temukan buku berdasarkan kata kunci judul maupun nama penulis secara instan.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Indikator Stok Real-Time</h2>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              Status stok kosong ditandai otomatis berwarna merah untuk memudahkan pengecekan.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Arsip Terstruktur</h2>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              Setiap buku memiliki halaman detail lengkap beserta deskripsi dan tahun terbit.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}