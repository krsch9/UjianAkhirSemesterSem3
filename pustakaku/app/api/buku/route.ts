import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cari = searchParams.get("cari")?.trim();

    const data = await prisma.buku.findMany({
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

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const body: {
        judul?: unknown;
        penulis?: unknown;
        kategori?: unknown;
        tahunTerbit?: unknown;
        stokTotal?: unknown;
        deskripsi?: unknown;
    } | null = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
        return NextResponse.json(
            { error: "Body harus berupa JSON yang valid." },
            { status: 400 }
        );
    }

    const judul = typeof body.judul === "string" ? body.judul.trim() : "";
    const penulis = typeof body.penulis === "string" ? body.penulis.trim() : "";
    const kategori = typeof body.kategori === "string" ? body.kategori.trim() : "";
    const deskripsi = typeof body.deskripsi === "string" ? body.deskripsi.trim() : "";

    const tahunTerbit =
        body.tahunTerbit !== undefined && body.tahunTerbit !== ""
            ? Number(body.tahunTerbit)
            : null;

    const stokTotal = Number(body.stokTotal);

    if (!judul) {
        return NextResponse.json({ error: "Judul wajib diisi." }, { status: 400 });
    }
    if (!penulis) {
        return NextResponse.json({ error: "Penulis wajib diisi." }, { status: 400 });
    }
    if (!kategori) {
        return NextResponse.json({ error: "Kategori wajib dipilih." }, { status: 400 });
    }
    if (tahunTerbit !== null && (!Number.isInteger(tahunTerbit) || tahunTerbit < 1000)) {
        return NextResponse.json({ error: "Tahun terbit tidak valid." }, { status: 400 });
    }
    if (!Number.isInteger(stokTotal) || stokTotal < 0) {
        return NextResponse.json({ error: "Jumlah stok minimal 0." }, { status: 400 });
    }

    try {
        const baru = await prisma.buku.create({
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

        return NextResponse.json(baru, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Terjadi kesalahan di server." },
            { status: 500 }
        );
    }
}