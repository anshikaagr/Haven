import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative mb-8">
      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
      />
      <input
        type="text"
        placeholder="Search documents..."
        value={value}
        onChange={onChange}
        className="h-14 w-full rounded-2xl border border-zinc-800 bg-zinc-900 pl-14 pr-4 text-white placeholder:text-zinc-500 transition-all duration-200 focus:border-zinc-600 focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;