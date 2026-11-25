import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import SearchBar from "@/components/SearchBar";
import BookTable from "@/components/BookTable";

async function KontenDaftarBuku({
    searchParams,
}: {
    searchParams: Promise<{ cari?: string | string[] }>;
}) {
    const { cari: nilaiCari } = await searchParams;
    const cari = Array.isArray(nilaiCari) ? nilaiCari[0] : nilaiCari;

    const daftarBuku = await prisma.buku.findMany({
        where: cari
            ? {
                OR: [
                    { judul: { contains: cari } },
                    { penulis: { contains: cari } },
                ],
            }
            : undefined,
        orderBy: { id: "asc" },
    });

    return (
        <>
            <div className="mb-6">
                <SearchBar defaultCari={cari} />
            </div>
            <BookTable daftarBuku={daftarBuku} />
        </>
    );
}

export default function DaftarBukuPage({
    searchParams,
}: {
    searchParams: Promise<{ cari?: string | string[] }>;
}) {
    return (
        <div className="min-h-[calc(100vh-65px)] bg-white">
            <main className="mx-auto max-w-5xl px-6 py-10">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Daftar buku</h1>
                    <Link
                        href="/buku/baru"
                        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        + Tambah buku
                    </Link>
                </div>

                <Suspense
                    fallback={<p className="py-8 text-sm text-gray-500">Memuat daftar buku...</p>}
                >
                    <KontenDaftarBuku searchParams={searchParams} />
                </Suspense>
            </main>
        </div>
    );
}