import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DocumentCard from "../components/DocumentCard";
import UploadModal from "../components/UploadModal";
import api from "../api/api";

function Expiry() {
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
  const today = new Date();

  const expiryDocuments = documents.filter(
    (doc) => doc.expiryDate
  );

  const filteredDocuments = expiryDocuments.filter((doc) => {
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const expiredDocuments = filteredDocuments.filter((doc) => {
    return new Date(doc.expiryDate) < today;
  });

  const expiringSoonDocuments = filteredDocuments.filter((doc) => {
    const days =
      (new Date(doc.expiryDate) - today) /
      (1000 * 60 * 60 * 24);

    return days >= 0 && days <= 30;
  });

  const validDocuments = filteredDocuments.filter((doc) => {
    const days =
      (new Date(doc.expiryDate) - today) /
      (1000 * 60 * 60 * 24);

    return days > 30;
  });

  const renderDocuments = (docs, emptyMessage) => {
  if (docs.length === 0) {
    return <p className="text-zinc-500">{emptyMessage}</p>;
  }

  return (
      <div className="grid gap-4 md:grid-cols-2">
        {docs.map((doc) => (
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
        ))}
      </div>
    );
  };
  return (
    <Layout>
      <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Expiry Center
        </h1>

        <p className="mt-2 text-zinc-400">
          Track documents that require renewal.
        </p>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-xl bg-white px-4 py-2 text-black"
      >
        + Upload
      </button>
    </div>

    <input
      type="text"
      placeholder="Search expiry documents..."
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

    <h2 className="mt-10 mb-4 text-xl font-semibold text-red-400">
      Expired
    </h2>
    {renderDocuments(expiredDocuments, "No expired documents.")}

    <h2 className="mt-10 mb-4 text-xl font-semibold text-yellow-400">
      Expiring Soon
    </h2>
    {renderDocuments(
      expiringSoonDocuments,
      "No documents expiring soon."
    )}

    <h2 className="mt-10 mb-4 text-xl font-semibold text-green-400">
      Valid
    </h2>

{renderDocuments(validDocuments, "No valid documents.")}

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

export default Expiry;