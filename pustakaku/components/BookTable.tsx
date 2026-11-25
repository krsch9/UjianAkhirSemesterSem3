import Link from "next/link";

export type BukuItem = {
    id: number;
    judul: string;
    penulis: string;
    kategori: string;
    stokTersedia: number;
    stokTotal: number;
};

type BookTableProps = {
    daftarBuku: BukuItem[];
};

export default function BookTable({ daftarBuku }: BookTableProps) {
    if (daftarBuku.length === 0) {
        return (
            <div className="rounded-lg border border-gray-200 p-8 text-center text-sm text-gray-500">
                Buku tidak ditemukan atau belum ada data buku.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                    <tr>
                        <th className="px-4 py-3 font-medium">No</th>
                        <th className="px-4 py-3 font-medium">Judul</th>
                        <th className="px-4 py-3 font-medium">Penulis</th>
                        <th className="px-4 py-3 font-medium">Kategori</th>
                        <th className="px-4 py-3 font-medium">Stok</th>
                        <th className="px-4 py-3 font-medium">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {daftarBuku.map((buku, index) => {
                        const stokKosong = buku.stokTersedia === 0;

                        return (
                            <tr key={buku.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                                <td className="px-4 py-3 font-medium text-gray-900">{buku.judul}</td>
                                <td className="px-4 py-3 text-gray-700">{buku.penulis}</td>
                                <td className="px-4 py-3 text-gray-700">{buku.kategori}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${stokKosong
                                                ? "bg-red-100 text-red-700"
                                                : "text-gray-700"
                                            }`}
                                    >
                                        {buku.stokTersedia}/{buku.stokTotal}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <Link
                                        href={`/buku/${buku.id}`}
                                        className="inline-block rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                                    >
                                        Detail
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}