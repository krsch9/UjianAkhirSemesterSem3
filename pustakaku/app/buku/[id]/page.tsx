import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

async function KontenDetailBuku({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const nomorId = Number(id);

    if (!Number.isInteger(nomorId)) {
        notFound();
    }

    const buku = await prisma.buku.findUnique({
        where: { id: nomorId },
    });

    if (!buku) {
        notFound();
    }

    const stokKosong = buku.stokTersedia === 0;

    return (
        <div className="mt-6 flex flex-col gap-8 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row sm:p-8">
            {/* Placeholder Sampul di Kiri sesuai Mockup */}
            <div className="flex h-56 w-40 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-sm font-medium text-gray-500">
                Sampul
            </div>

            {/* Informasi Detail di Kanan */}
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{buku.judul}</h1>

                <p className="mt-2 text-sm text-gray-700">
                    <span className="font-medium">Penulis:</span> {buku.penulis}
                </p>

                <p className="mt-1 text-sm text-gray-700">
                    <span className="font-medium">Kategori:</span> {buku.kategori}
                    {buku.tahunTerbit ? ` · Tahun: ${buku.tahunTerbit}` : ""}
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
                    <span className="font-medium">Stok:</span>
                    <span
                        className={`rounded-full px-3 py-0.5 text-xs font-medium ${stokKosong
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-800"
                            }`}
                    >
                        {buku.stokTersedia} dari {buku.stokTotal} tersedia
                    </span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-gray-600">
                    {buku.deskripsi || "Tidak ada deskripsi singkat untuk buku ini."}
                </p>
            </div>
        </div>
    );
}

export default function DetailBukuPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <main className="mx-auto max-w-3xl px-6 py-10">
            <Link
                href="/buku"
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
            >
                &lsaquo; Kembali ke daftar
            </Link>

            <Suspense
                fallback={<p className="mt-6 text-sm text-gray-500">Memuat detail buku...</p>}
            >
                <KontenDetailBuku params={params} />
            </Suspense>
        </main>
    );
}