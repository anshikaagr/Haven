import api from "../api/api";
import { useState } from "react";
import EditDocumentModal from "./EditDocumentModal";
import toast from "react-hot-toast";

function DocumentCard({id, title, category, fileUrl, important,expiryDate,fetchDocuments}) {

  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleImportant = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/documents/${id}/important`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(important? "Removed from important": "Marked as important");

      fetchDocuments();

    } catch (error) {
      console.log(error);
      toast.error("Failed to update important status");
    }
  };

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

      toast.success("Document deleted successfully");

      await fetchDocuments();

    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Delete failed!");
    }
  };

  const handleDownload = () => {
    const downloadUrl = fileUrl.replace(
      "/upload/","/upload/fl_attachment/");
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const getExpiryStatus = () => {
  if (!expiryDate) return null;

  const today = new Date();
  const expiry = new Date(expiryDate);

  const days = Math.ceil(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  if (days < 0) {
    return {
      text: `🔴 Expired ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} ago`,
      className: "text-red-400",
    };
  }

  if (days <= 30) {
    return {
      text: `🟡 Expires in ${days} day${days === 1 ? "" : "s"}`,
      className: "text-yellow-400",
    };
  }

    return {
      text: `🟢 Expires in ${days} day${days === 1 ? "" : "s"}`,
      className: "text-green-400",
    };
  };

const expiryStatus = getExpiryStatus();
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="font-semibold text-lg">{title}</h3>

      <p className="mt-1 text-sm text-zinc-400">
        {category}
      </p>
      {expiryDate && (
        <p className="mt-2 text-sm text-zinc-400">
          Expiry: {new Date(expiryDate).toLocaleDateString()}
        </p>
      )}
      {expiryStatus && (
        <p className={`mt-1 text-sm font-medium ${expiryStatus.className}`}>
          {expiryStatus.text}
        </p>
      )}

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => window.open(fileUrl, "_blank")}
          className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
        >
          View Document
        </button>

        <button
          onClick={handleDownload}
          className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Download
        </button>

        <button onClick={() => setIsEditOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Edit
        </button>

        <button
          onClick={handleImportant}
          className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-400"
        >
          {important ? "★" : "☆"}
        </button>

        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    <EditDocumentModal
      isOpen={isEditOpen}
      onClose={() => setIsEditOpen(false)}
      document={{
        _id: id,
        title,
        category,
        expiryDate,
      }}
      fetchDocuments={fetchDocuments}
    />
    </div>
  );
}

export default DocumentCard;