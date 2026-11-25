import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type Konteks = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Konteks) {
    const { id } = await params; // Wajib await di Next.js 15+
    const nomorId = Number(id);

    if (!Number.isInteger(nomorId)) {
        return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    const data = await prisma.buku.findUnique({
        where: { id: nomorId },
    });

    if (!data) {
        return NextResponse.json({ error: "Buku tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json(data);
}

export async function DELETE(_request: Request, { params }: Konteks) {
    const { id } = await params; // Wajib await
    const nomorId = Number(id);

    if (!Number.isInteger(nomorId)) {
        return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    try {
        await prisma.buku.delete({
            where: { id: nomorId },
        });

        return NextResponse.json({ pesan: "Buku berhasil dihapus." });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
            return NextResponse.json({ error: "Buku tidak ditemukan." }, { status: 404 });
        }

        return NextResponse.json(
            { error: "Terjadi kesalahan di server." },
            { status: 500 }
        );
    }
}