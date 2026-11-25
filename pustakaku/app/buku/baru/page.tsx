import BookForm from "@/components/BookForm";

export default function TambahBukuPage() {
    return (
        <main className="mx-auto max-w-2xl px-6 py-10">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h1 className="mb-6 text-xl font-bold text-gray-900">Tambah buku baru</h1>
                <BookForm />
            </div>
        </main>
    );
}