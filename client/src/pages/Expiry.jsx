import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DocumentCard from "../components/DocumentCard";
import UploadModal from "../components/UploadModal";
import api from "../api/api";
import SearchBar from "../components/SearchBar";
import {
  Upload,
  AlertTriangle,
  Clock3,
  ShieldCheck,
} from "lucide-react";

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
        className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-medium text-black transition-all duration-200 hover:scale-105 hover:bg-zinc-200"
      >
        <Upload size={18} />
        Upload
      </button>
    </div>
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
    <div className="mt-10 grid gap-4 md:grid-cols-3">

      <div className="rounded-2xl border border-red-500/20 bg-zinc-900 p-5">
        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-red-500/10 p-3">
            <AlertTriangle
              size={22}
              className="text-red-400"
            />
          </div>

          <div>
            <p className="text-sm text-zinc-400">
              Expired
            </p>

            <h2 className="text-3xl font-bold text-red-400">
              {expiredDocuments.length}
            </h2>
          </div>

        </div>
      </div>

      <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-5">
        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-yellow-500/10 p-3">
            <Clock3
              size={22}
              className="text-yellow-400"
            />
          </div>

          <div>
            <p className="text-sm text-zinc-400">
              Expiring Soon
            </p>

            <h2 className="text-3xl font-bold text-yellow-400">
              {expiringSoonDocuments.length}
            </h2>
          </div>

        </div>
      </div>

      <div className="rounded-2xl border border-green-500/20 bg-zinc-900 p-5">
        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-green-500/10 p-3">
            <ShieldCheck
              size={22}
              className="text-green-400"
            />
          </div>

          <div>
            <p className="text-sm text-zinc-400">
              Valid
            </p>

            <h2 className="text-3xl font-bold text-green-400">
              {validDocuments.length}
            </h2>
          </div>

        </div>
      </div>

    </div>
    <div className="mt-12 mb-5 flex items-center gap-3">
    <div className="h-px flex-1 bg-zinc-800" />
    <h2 className="mt-12 mb-5 text-2xl font-semibold text-red-400">
      Expired
    </h2>
     <div className="h-px flex-1 bg-zinc-800" />
    </div>
    {renderDocuments(expiredDocuments, "No expired documents.")}
    <div className="mt-12 mb-5 flex items-center gap-3">
    <div className="h-px flex-1 bg-zinc-800" />
    <h2 className="mt-12 mb-5 text-2xl font-semibold text-yellow-400">
      Expiring Soon
    </h2>
    <div className="h-px flex-1 bg-zinc-800" />
    </div>
    {renderDocuments(
      expiringSoonDocuments,
      "No documents expiring soon."
    )}
    <div className="mt-12 mb-5 flex items-center gap-3">
    <div className="h-px flex-1 bg-zinc-800" />
    <h2 className="mt-12 mb-5 text-2xl font-semibold text-green-400">
      Valid
    </h2>
    <div className="h-px flex-1 bg-zinc-800" />
    </div>

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