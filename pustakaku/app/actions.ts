"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export type BookFormState = {
    sukses: boolean;
    pesan: string;
    galat?: {
        judul?: string;
        penulis?: string;
        kategori?: string;
        tahunTerbit?: string;
        stokTotal?: string;
    };
    values?: {
        judul: string;
        penulis: string;
        kategori: string;
        tahunTerbit: string;
        stokTotal: string;
        deskripsi: string;
    };
};

export async function tambahBuku(
    _prev: BookFormState,
    formData: FormData
): Promise<BookFormState> {
    const judul = String(formData.get("judul") ?? "").trim();
    const penulis = String(formData.get("penulis") ?? "").trim();
    const kategori = String(formData.get("kategori") ?? "").trim();
    const tahunTerbitRaw = String(formData.get("tahunTerbit") ?? "").trim();
    const stokTotalRaw = String(formData.get("stokTotal") ?? "").trim();
    const deskripsi = String(formData.get("deskripsi") ?? "").trim();

    const values = {
        judul,
        penulis,
        kategori,
        tahunTerbit: tahunTerbitRaw,
        stokTotal: stokTotalRaw,
        deskripsi,
    };

    const galat: NonNullable<BookFormState["galat"]> = {};
    if (!judul) galat.judul = "Judul wajib diisi";
    if (!penulis) galat.penulis = "Penulis wajib diisi";
    if (!kategori) galat.kategori = "Kategori wajib dipilih";

    const tahunTerbit = tahunTerbitRaw ? Number(tahunTerbitRaw) : null;
    if (tahunTerbitRaw && (!Number.isInteger(tahunTerbit) || tahunTerbit! < 1000)) {
        galat.tahunTerbit = "Tahun terbit tidak valid";
    }

    const stokTotal = Number(stokTotalRaw);
    if (stokTotalRaw === "" || !Number.isInteger(stokTotal) || stokTotal < 0) {
        galat.stokTotal = "Jumlah stok minimal 0";
    }

    if (Object.keys(galat).length > 0) {
        return {
            sukses: false,
            pesan: "Periksa kembali isian form.",
            galat,
            values,
        };
    }

    try {
        await prisma.buku.create({
            data: {
                judul,
                penulis,
                kategori,
                tahunTerbit,
                stokTersedia: stokTotal,
                stokTotal,
                deskripsi: deskripsi || null,
            },
        });
    } catch {
        return {
            sukses: false,
            pesan: "Terjadi kesalahan saat menyimpan data ke database.",
            values,
        };
    }

    revalidatePath("/buku");
    redirect("/buku");
}