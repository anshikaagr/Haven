function SearchBar() {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search documents..."
        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none"
      />
    </div>
  );
}

export default SearchBar;