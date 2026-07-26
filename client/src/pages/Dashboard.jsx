import { useEffect, useState } from "react";
import api from "../api/api";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import DocumentCard from "../components/DocumentCard";
import UploadModal from "../components/UploadModal";
import { FileText } from "lucide-react";
import { Upload,
  Folder,
  IdCard,
  GraduationCap,
  Landmark,
  HeartPulse,
  FolderOpen } from "lucide-react";

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
  const categoryIcons = {
  All: Folder,
  Identity: IdCard,
  Education: GraduationCap,
  Financial: Landmark,
  Medical: HeartPulse,
  Other: FolderOpen,
};
  const categories = [
  "All",
  "Identity",
  "Education",
  "Financial",
  "Medical",
  "Other",
];
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">

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
        className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-medium text-black transition-all duration-200 hover:scale-105 hover:bg-zinc-200"><Upload size={18} />Upload</button>

        </div>

        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <h2 className="mt-8 mb-4 text-xl font-semibold">Categories</h2>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">

                  {categories.map((category) => {
                    const Icon = categoryIcons[category];

                    return (

                    <div
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 ${
                        selectedCategory === category
                          ? "border-white bg-zinc-800 shadow-lg"
                          : "border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/50"
                      }`}
                    >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`rounded-lg p-2 ${
                          selectedCategory === category
                            ? "bg-white text-black"
                            : "bg-zinc-800 text-white"
                        }`}
                      >
                        <Icon size={18} />
                      </div>

                      <div>
                        <h3 className="font-medium">{category}</h3>

                        <p className="text-xs text-zinc-500">
                          {category === "All"
                            ? `${documents.length} Documents`
                            : `${categoryCounts[category]} Documents`}
                        </p>
                      </div>
                    </div>

                    </div>

                  );
                })}
                </div>


            <h2 className="mt-8 mb-4 text-xl font-semibold">Recent Documents</h2>

            <div className="grid gap-5 lg:grid-cols-2">
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
              <div className="col-span-2 rounded-xl border border-dashed border-zinc-700 bg-zinc-900 py-10 px-8 text-center">
              <FileText
                size={48}
                className="mx-auto mb-5 text-zinc-600"
              />

              <h3 className="text-2xl font-semibold ">No documents found</h3>

              <p className="mt-3 text-zinc-400">
                Upload your first document to get started.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
              > Upload Document
              </button>
            </div>
          )}
            </div>
            </main>
            <UploadModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              fetchDocuments={fetchDocuments}
            />
            </div>
  );
}

export default Dashboard;