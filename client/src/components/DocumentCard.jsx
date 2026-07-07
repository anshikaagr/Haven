import api from "../api/api";

function DocumentCard({id, title, category, fileUrl ,fetchDocuments}) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/documents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Document deleted!");

      await fetchDocuments();

    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Delete failed!");
    }
  };
  
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="font-semibold text-lg">{title}</h3>

      <p className="mt-1 text-sm text-zinc-400">
        {category}
      </p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => window.open(fileUrl, "_blank")}
          className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
        >
          View Document
        </button>

        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>

    </div>
  );
}

export default DocumentCard;