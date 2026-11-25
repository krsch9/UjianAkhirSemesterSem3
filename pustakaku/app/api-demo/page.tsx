"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";

type Buku = {
    id: number;
    judul: string;
    penulis: string;
    kategori: string;
    tahunTerbit: number | null;
    stokTersedia: number;
    stokTotal: number;
    deskripsi: string | null;
};

type Status = { ok: boolean; teks: string } | null;

export default function ApiDemoBukuPage() {
    const [daftar, setDaftar] = useState<Buku[]>([]);
    const [memuat, setMemuat] = useState(true);
    const [status, setStatus] = useState<Status>(null);
    const [kataInput, setKataInput] = useState("");
    const [kataAktif, setKataAktif] = useState("");
    const [versi, setVersi] = useState(0);

    useEffect(() => {
        let batal = false;
        const url = kataAktif
            ? `/api/buku?cari=${encodeURIComponent(kataAktif)}`
            : "/api/buku";

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Gagal memuat data buku.");
                return res.json();
            })
            .then((data: Buku[]) => {
                if (!batal) setDaftar(data);
            })
            .catch((e: Error) => {
                if (!batal) setStatus({ ok: false, teks: e.message });
            })
            .finally(() => {
                if (!batal) setMemuat(false);
            });

        return () => {
            batal = true;
        };
    }, [kataAktif, versi]);

    async function kirim(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const isian = Object.fromEntries(new FormData(form));

        const res = await fetch("/api/buku", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(isian),
        });

        const hasil = await res.json();

        if (!res.ok) {
            setStatus({ ok: false, teks: hasil.error ?? "Gagal menyimpan buku." });
            return;
        }

        form.reset();
        setStatus({ ok: true, teks: `Buku "${hasil.judul}" tersimpan dengan ID ${hasil.id}.` });
        setVersi((v) => v + 1);
    }

    async function hapus(id: number) {
        if (!confirm("Hapus buku ini dari database?")) return;

        const res = await fetch(`/api/buku/${id}`, { method: "DELETE" });
        const hasil = await res.json();

        if (!res.ok) {
            setStatus({ ok: false, teks: hasil.error ?? "Gagal menghapus buku." });
            return;
        }

        setStatus({ ok: true, teks: hasil.pesan });
        setVersi((v) => v + 1);
    }

    function cariData(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setKataAktif(kataInput.trim());
    }

    return (
        <main className="mx-auto max-w-2xl px-6 py-10">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                &lsaquo; Kembali ke Beranda
            </Link>

            <h1 className="mt-4 mb-6 text-2xl font-bold text-gray-900">
                Demo CRUD Buku via REST API
            </h1>

            <form
                onSubmit={kirim}
                className="space-y-3 rounded-xl border border-gray-200 bg-white p-5"
            >
                <input
                    name="judul"
                    placeholder="Judul buku *"
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                />
                <input
                    name="penulis"
                    placeholder="Penulis *"
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <select
                        name="kategori"
                        defaultValue=""
                        className="rounded-lg border border-gray-300 bg-white p-2 text-sm"
                    >
                        <option value="" disabled>
                            Pilih kategori *
                        </option>
                        <option value="Novel">Novel</option>
                        <option value="Sains">Sains</option>
                        <option value="Sejarah">Sejarah</option>
                        <option value="Teknologi">Teknologi</option>
                    </select>
                    <input
                        name="tahunTerbit"
                        type="number"
                        placeholder="Tahun (opsional)"
                        className="rounded-lg border border-gray-300 p-2 text-sm"
                    />
                    <input
                        name="stokTotal"
                        type="number"
                        placeholder="Jumlah stok *"
                        className="rounded-lg border border-gray-300 p-2 text-sm"
                    />
                </div>
                <textarea
                    name="deskripsi"
                    rows={2}
                    placeholder="Deskripsi singkat (opsional)"
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                />
                <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                    Kirim ke API
                </button>
            </form>

            {status && (
                <p
                    className={`mt-3 text-sm font-medium ${status.ok ? "text-green-700" : "text-red-600"
                        }`}
                >
                    {status.teks}
                </p>
            )}

            <form onSubmit={cariData} className="mt-8 flex gap-2">
                <input
                    value={kataInput}
                    onChange={(e) => setKataInput(e.target.value)}
                    placeholder="Cari judul atau penulis..."
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                />
                <button className="rounded-lg bg-gray-900 px-4 text-sm font-medium text-white">
                    Cari
                </button>
            </form>

            <h2 className="mt-6 mb-3 text-lg font-semibold text-gray-900">
                Data dari API ({daftar.length})
            </h2>

            {memuat ? (
                <p className="text-sm text-gray-500">Memuat data...</p>
            ) : daftar.length === 0 ? (
                <p className="text-sm text-gray-500">Belum ada data buku.</p>
            ) : (
                <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
                    {daftar.map((b) => (
                        <li key={b.id} className="flex items-start justify-between gap-3 p-4">
                            <div>
                                <p className="font-medium text-gray-900">
                                    {b.judul}{" "}
                                    <span className="text-xs font-normal text-gray-500">
                                        ({b.kategori})
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Penulis: {b.penulis} · Stok: {b.stokTersedia}/{b.stokTotal}
                                </p>
                                {b.deskripsi && (
                                    <p className="mt-1 text-xs text-gray-500">{b.deskripsi}</p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => hapus(b.id)}
                                className="text-sm font-medium text-red-600 hover:underline"
                            >
                                Hapus
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}