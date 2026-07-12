import { useState } from "react";
import api from "../api/api";

function UploadModal({ isOpen, onClose ,
  fetchDocuments,}) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Identity");
    const [expiryDate, setExpiryDate] = useState("");
    const [file, setFile] = useState(null);
    const handleUpload = async () => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("expiryDate", expiryDate);
    formData.append("file", file);

    await api.post(
      "/documents", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Document uploaded!");
    await fetchDocuments();
    setTitle("");
    setCategory("Identity");
    setFile(null);

    onClose();

  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);

    alert(error.response?.data?.message || "Upload failed!");
  }
};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[450px] rounded-2xl bg-zinc-900 p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Upload Document
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
          placeholder="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
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

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6 w-full text-white"
        />

        <button
        onClick={handleUpload}
          className="w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-zinc-200"
        >
          Upload
        </button>

      </div>
    </div>
  );
}

export default UploadModal;