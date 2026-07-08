import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DocumentCard from "../components/DocumentCard";
import UploadModal from "../components/UploadModal";
import api from "../api/api";

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
          Important Documents
        </h1>

        <button onClick={() => setIsModalOpen(true)}
        className="rounded-xl bg-white px-4 py-2 text-black">
          + Upload
        </button>
      </div>

      <p className="mt-2 text-zinc-400">
        Your pinned and frequently used documents.
      </p>
      <input
        type="text"
        placeholder="Search important documents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-6 w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white outline-none"
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

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {filteredDocuments.map((doc) => (
          <DocumentCard
            key={doc._id}
            id={doc._id}
            title={doc.title}
            category={doc.category}
            fileUrl={doc.fileUrl}
            important={doc.important}
            fetchDocuments={fetchDocuments}
          />
        ))}
      </div>
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchDocuments();
        }}
      />
    </Layout>
  );
}

export default Important;