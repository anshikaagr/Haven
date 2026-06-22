import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import DocumentCard from "../components/DocumentCard";

function Dashboard() {
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

        <button className="rounded-xl bg-white px-5 py-3 font-medium text-black">+ Upload</button>

        </div>

        <SearchBar />

        <h2 className="mt-8 mb-4 text-xl font-semibold">Categories</h2>

                <div className="grid gap-4 md:grid-cols-5">

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <h3 className="font-medium">Identity</h3>
                    <p className="mt-2 text-2xl font-bold">4</p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <h3 className="font-medium">Education</h3>
                    <p className="mt-2 text-2xl font-bold">7</p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <h3 className="font-medium">Financial</h3>
                    <p className="mt-2 text-2xl font-bold">3</p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <h3 className="font-medium">Medical</h3>
                    <p className="mt-2 text-2xl font-bold">5</p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <h3 className="font-medium">Other</h3>
                    <p className="mt-2 text-2xl font-bold">2</p>
                </div>

                </div>


            <h2 className="mb-4 text-xl font-semibold">Recent Documents</h2>

            <div className="grid gap-4 md:grid-cols-2">
            <DocumentCard
                title="Passport.pdf"
                category="Identity"
            />
            <DocumentCard
                title="Semester Marksheet.pdf"
                category="Education"
            />
            <DocumentCard
                title="Offer Letter.pdf"
                category="Career"
            />
            </div>
                </main>

            </div>
  );
}

export default Dashboard;