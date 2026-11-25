"use client";

import Link from "next/link";
import { useActionState } from "react";
import { tambahBuku, type BookFormState } from "@/app/actions";

const initialState: BookFormState = {
    sukses: false,
    pesan: "",
};

export default function BookForm() {
    const [state, formAction, pending] = useActionState(tambahBuku, initialState);

    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="judul" className="block text-sm font-medium text-gray-800">
                    Judul <span className="text-red-600">*</span>
                </label>
                <input
                    id="judul"
                    name="judul"
                    type="text"
                    placeholder="Judul buku"
                    defaultValue={state.values?.judul}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none"
                />
                {state.galat?.judul && (
                    <p className="mt-1 text-xs text-red-600">{state.galat.judul}</p>
                )}
            </div>

            <div>
                <label htmlFor="penulis" className="block text-sm font-medium text-gray-800">
                    Penulis <span className="text-red-600">*</span>
                </label>
                <input
                    id="penulis"
                    name="penulis"
                    type="text"
                    placeholder="Nama penulis"
                    defaultValue={state.values?.penulis}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none"
                />
                {state.galat?.penulis && (
                    <p className="mt-1 text-xs text-red-600">{state.galat.penulis}</p>
                )}
            </div>

            <div>
                <label htmlFor="kategori" className="block text-sm font-medium text-gray-800">
                    Kategori <span className="text-red-600">*</span>
                </label>
                <select
                    id="kategori"
                    name="kategori"
                    defaultValue={state.values?.kategori ?? ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none"
                >
                    <option value="" disabled>
                        Pilih kategori
                    </option>
                    <option value="Novel">Novel</option>
                    <option value="Sains">Sains</option>
                    <option value="Sejarah">Sejarah</option>
                    <option value="Teknologi">Teknologi</option>
                    <option value="Pelajaran">Pelajaran</option>
                </select>
                {state.galat?.kategori && (
                    <p className="mt-1 text-xs text-red-600">{state.galat.kategori}</p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="tahunTerbit" className="block text-sm font-medium text-gray-800">
                        Tahun terbit
                    </label>
                    <input
                        id="tahunTerbit"
                        name="tahunTerbit"
                        type="number"
                        placeholder="2005"
                        defaultValue={state.values?.tahunTerbit}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none"
                    />
                    {state.galat?.tahunTerbit && (
                        <p className="mt-1 text-xs text-red-600">{state.galat.tahunTerbit}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="stokTotal" className="block text-sm font-medium text-gray-800">
                        Jumlah stok <span className="text-red-600">*</span>
                    </label>
                    <input
                        id="stokTotal"
                        name="stokTotal"
                        type="number"
                        min={0}
                        placeholder="5"
                        defaultValue={state.values?.stokTotal}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none"
                    />
                    {state.galat?.stokTotal && (
                        <p className="mt-1 text-xs text-red-600">{state.galat.stokTotal}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-800">
                    Deskripsi
                </label>
                <textarea
                    id="deskripsi"
                    name="deskripsi"
                    rows={3}
                    placeholder="Deskripsi buku"
                    defaultValue={state.values?.deskripsi}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none"
                />
            </div>

            {state.pesan && !state.sukses && (
                <p className="text-sm text-red-600">{state.pesan}</p>
            )}

            <div className="flex items-center justify-between pt-2">
                <Link
                    href="/buku"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={pending}
                    className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    {pending ? "Menyimpan..." : "Simpan"}
                </button>
            </div>
        </form>
    );
}