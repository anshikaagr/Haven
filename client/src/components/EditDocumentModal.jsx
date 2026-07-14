import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

function EditDocumentModal({
  isOpen,
  onClose,
  document,
  fetchDocuments,
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Identity");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    if (document) {
      setTitle(document.title);
      setCategory(document.category);
      setExpiryDate(
      document.expiryDate
          ? document.expiryDate.substring(0, 10)
          : ""
      );
    }
  }, [document]);

  if (!isOpen) return null;

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/documents/${document._id}`,
        {
          title,
          category,
          expiryDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Document updated successfully");

      fetchDocuments();

      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[450px] rounded-2xl bg-zinc-900 p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Edit Document
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-zinc-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-6 w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
        >
          <option>Identity</option>
          <option>Education</option>
          <option>Financial</option>
          <option>Medical</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
        />

        <button onClick={handleUpdate}
          className="w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-zinc-200">
          Save Changes
        </button>

      </div>
    </div>
  );
}

export default EditDocumentModal;