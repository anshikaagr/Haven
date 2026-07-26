import api from "../api/api";
import { useState } from "react";
import EditDocumentModal from "./EditDocumentModal";
import toast from "react-hot-toast";
import {
  FileText,
  Eye,
  Download,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";

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

      await fetchDocuments();

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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-300 hover:border-zinc-700">

    {/* Header */}
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-zinc-800 p-3">
          <FileText size={22} />
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          <p className="text-sm text-zinc-500">
            {category}
          </p>
        </div>

      </div>

      <button
        onClick={handleImportant}
        className="rounded-lg p-2 hover:bg-zinc-800"
      >
        <Star
          size={18}
          fill={important ? "currentColor" : "none"}
        />
      </button>

    </div>

    {/* Expiry */}

    {expiryDate && (
      <p className="mt-4 text-sm text-zinc-500">
        Expiry: {new Date(expiryDate).toLocaleDateString()}
      </p>
    )}

    {expiryStatus && (
      <p className={`mt-1 text-sm ${expiryStatus.className}`}>
        {expiryStatus.text}
      </p>
    )}

    {/* Actions */}

    <div className="mt-5 flex items-center justify-between">

      <button
        onClick={() => window.open(fileUrl, "_blank")}
        className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
      >
        <Eye size={16} />
        View
      </button>

      <div className="flex gap-2">

        <button
          onClick={handleDownload}
          className="rounded-lg p-2 hover:bg-zinc-800"
        >
          <Download size={18} />
        </button>

        <button
          onClick={() => setIsEditOpen(true)}
          className="rounded-lg p-2 hover:bg-zinc-800"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={handleDelete}
          className="rounded-lg p-2 hover:bg-red-600/20 hover:text-red-400"
        >
          <Trash2 size={18} />
        </button>
      </div>
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