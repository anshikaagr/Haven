import Layout from "../components/Layout";
import DocumentCard from "../components/DocumentCard";

function Important() {
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Important Documents
        </h1>

        <button className="rounded-xl bg-white px-4 py-2 text-black">
          + Add Important
        </button>
      </div>

      <p className="mt-2 text-zinc-400">
        Your pinned and frequently used documents.
      </p>
      <input
        type="text"
        placeholder="Search important documents..."
        className="mt-6 w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white outline-none"
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <DocumentCard
          title="Aadhaar Card.pdf"
          category="Identity"
        />

        <DocumentCard
          title="PAN Card.pdf"
          category="Identity"
        />

        <DocumentCard
          title="Passport.pdf"
          category="Identity"
        />

        <DocumentCard
          title="Degree Certificate.pdf"
          category="Education"
        />
      </div>
    </Layout>
  );
}

export default Important;