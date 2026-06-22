function DocumentCard({ title, category }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-zinc-400">{category}</p>
    </div>
  );
}

export default DocumentCard;