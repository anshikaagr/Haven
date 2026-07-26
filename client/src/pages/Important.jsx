import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DocumentCard from "../components/DocumentCard";
import UploadModal from "../components/UploadModal";
import api from "../api/api";
import SearchBar from "../components/SearchBar";
import { Upload, FileText } from "lucide-react";

function Important() {
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

  const categories = [
    "All",
    "Identity",
    "Education",
    "Financial",
    "Medical",
    "Other",
  ];

  const importantDocuments = documents.filter(
    (doc) => doc.important
  );

  const filteredDocuments = importantDocuments.filter((doc) => {
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Important Documents ({filteredDocuments.length})
        </h1>

        <button onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-medium text-black transition-all duration-200 hover:scale-105 hover:bg-zinc-200">
          <Upload size={18} />
          Upload
        </button>
      </div>

      <p className="mt-2 text-zinc-400">
        Your pinned and frequently used documents.
      </p>
      <div className="mt-5">
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>

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

      <div className="mt-10 grid gap-4 md:grid-cols-2">
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
    <div className="col-span-2 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 py-10 px-8 text-center">

      <FileText
        size={48}
        className="mx-auto mb-5 text-zinc-600"
      />

      <h3 className="text-2xl font-semibold">
        No important documents
      </h3>

      <p className="mt-3 text-zinc-400">
        Star documents to keep your most important files within easy reach.
      </p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-8 rounded-xl bg-white px-6 py-3 font-medium text-black hover:bg-zinc-200"
      > Upload Document
      </button>

    </div>
  )}
      </div>
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fetchDocuments={fetchDocuments}
      />
          </Layout>
  );
}

export default Important;