function DocumentCard({ title, category, fileUrl }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="font-semibold text-lg">{title}</h3>

      <p className="mt-1 text-sm text-zinc-400">
        {category}
      </p>

      <button
        onClick={() => window.open(fileUrl, "_blank")}
        className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
      >
        View Document
      </button>
    </div>
  );
}

export default DocumentCard;