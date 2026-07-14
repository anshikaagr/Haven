import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DocumentCard from "../components/DocumentCard";
import UploadModal from "../components/UploadModal";
import api from "../api/api";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/documents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDocuments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    "Identity",
    "Education",
    "Financial",
    "Medical",
    "Other",
  ];

  return (
    <Layout>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Documents</h1>
        <button onClick={() => setIsModalOpen(true)}
        className="rounded-xl bg-white px-4 py-2 text-black">+ Upload</button>
      </div>

      <p className="mt-2 text-zinc-400">All your documents in one place.</p>

      <input
        type="text"
        placeholder="Search documents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-6 w-full rounded-xl bg-zinc-900 p-4 text-white outline-none border border-zinc-800"
      />

      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-lg px-4 py-2 transition ${
              selectedCategory === category
                ? "bg-white text-black"
                : "bg-zinc-800 text-white hover:bg-zinc-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <h2 className="mt-10 mb-4 text-2xl font-semibold">
        All Documents
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredDocuments.length > 0 ? (
        filteredDocuments.map((doc) => (
          <DocumentCard
            key={doc._id}
            id={doc._id}
            title={doc.title}
            category={doc.category}
            fileUrl={doc.fileUrl}
            important={doc.important}
            expiryDate={doc.expiryDate}
            fetchDocuments={fetchDocuments}
          />
        ))
      ) : (
        <div className="col-span-2 rounded-xl border border-dashed border-zinc-700 bg-zinc-900 p-10 text-center">
          <h3 className="text-xl font-semibold text-white">No documents found</h3>

          <p className="mt-2 text-zinc-400">
            Upload your first document to start organizing your vault.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
          >Upload Document
          </button>
        </div>
      )}
      </div>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        fetchDocuments={fetchDocuments}
        />

    </Layout>
  );
}

export default Documents;