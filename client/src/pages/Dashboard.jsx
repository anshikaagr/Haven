import { useEffect, useState } from "react";
import api from "../api/api";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import DocumentCard from "../components/DocumentCard";
import UploadModal from "../components/UploadModal";

function Dashboard() {

    const [documents, setDocuments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

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
const categoryCounts = {
  Identity: documents.filter(doc => doc.category === "Identity").length,
  Education: documents.filter(doc => doc.category === "Education").length,
  Financial: documents.filter(doc => doc.category === "Financial").length,
  Medical: documents.filter(doc => doc.category === "Medical").length,
  Other: documents.filter(doc => doc.category === "Other").length,
};
  const filteredDocuments = documents.filter((doc) =>{
      const matchesSearch = doc.title
      .toLowerCase()
      .includes(search.toLowerCase());
      
    const matchesCategory =
      selectedCategory === "All" ||
      doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }
  
  );
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-6 flex items-start justify-between">

        <div>
            <h1 className="text-3xl font-bold">
            Search your documents
            </h1>

            <p className="mt-2 text-zinc-400">
            Always know where it is.
            </p>
        </div>

        <button 
        onClick={() => setIsModalOpen(true)}
        className="rounded-xl bg-white px-5 py-3 font-medium text-black">+ Upload</button>

        </div>

        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white outline-none"
        />

        <h2 className="mt-8 mb-4 text-xl font-semibold">Categories</h2>

                <div className="grid gap-4 md:grid-cols-5">
                <div
                  onClick={() => setSelectedCategory("All")}
                  className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-white transition"
                >
                  <h3 className="font-medium">All</h3>
                  <p className="mt-2 text-2xl font-bold">
                    {documents.length}
                  </p>
                </div>
                <div onClick={() => setSelectedCategory("Identity")}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <h3 className="font-medium">Identity</h3>
                    <p className="mt-2 text-2xl font-bold">{categoryCounts.Identity}</p>
                </div>

                <div onClick={() => setSelectedCategory("Education")}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <h3 className="font-medium">Education</h3>
                    <p className="mt-2 text-2xl font-bold">{categoryCounts.Education}</p>
                </div>

                <div onClick={() => setSelectedCategory("Financial")}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <h3 className="font-medium">Financial</h3>
                    <p className="mt-2 text-2xl font-bold">{categoryCounts.Financial}</p>
                </div>

                <div onClick={() => setSelectedCategory("Medical")}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <h3 className="font-medium">Medical</h3>
                    <p className="mt-2 text-2xl font-bold">{categoryCounts.Medical}</p>
                </div>

                <div onClick={() => setSelectedCategory("Other")}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <h3 className="font-medium">Other</h3>
                    <p className="mt-2 text-2xl font-bold">{categoryCounts.Other}</p>
                </div>

                </div>


            <h2 className="mb-4 text-xl font-semibold">Recent Documents</h2>

            <div className="grid gap-4 md:grid-cols-2">
            {filteredDocuments.map((doc) => (
                <DocumentCard
                key={doc._id}
                id={doc._id}
                title={doc.title}
                category={doc.category}
                fileUrl={doc.fileUrl}
                fetchDocuments={fetchDocuments}
                />
            ))}
            </div>
            </main>
            <UploadModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              
            />
            </div>
  );
}

export default Dashboard;