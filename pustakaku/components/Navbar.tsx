import Link from "next/link";

export default function Navbar() {
    return (
        <header className="border-b border-gray-200 bg-white">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
                    PustakaKu
                </Link>

                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="text-gray-600 hover:text-gray-900">
                        Beranda
                    </Link>
                    <Link href="/buku" className="text-gray-600 hover:text-gray-900">
                        Daftar Buku
                    </Link>
                    <Link
                        href="/buku/baru"
                        className="rounded-lg bg-gray-900 px-3.5 py-2 text-white hover:bg-gray-800"
                    >
                        + Tambah buku
                    </Link>
                </div>
            </nav>
        </header>
    );
}