type SearchBarProps = {
    defaultCari?: string;
};

export default function SearchBar({ defaultCari = "" }: SearchBarProps) {
    return (
        <form action="/buku" method="get" className="flex items-center gap-3">
            <input
                type="text"
                name="cari"
                defaultValue={defaultCari}
                placeholder="Cari judul atau penulis"
                className="w-full max-w-md rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-gray-900 focus:outline-none"
            />
            <button
                type="submit"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
                Cari
            </button>
        </form>
    );
}