import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-[calc(100vh-65px)] flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        PustakaKu
      </h1>

      <p className="mt-3 text-lg font-medium text-gray-800">
        Buku adalah Jendela Dunia
      </p>

      <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
        Selamat datang di PustakaKu! Kamu dapat melihat koleksi buku yang
        tersedia dan memeriksa jumlah stok secara langsung.
      </p>

      <div className="mt-8">
        <Link
          href="/buku"
          className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Daftar Buku
        </Link>
      </div>
    </main>
  );
}