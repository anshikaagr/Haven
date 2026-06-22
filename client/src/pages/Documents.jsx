import Layout from "../components/Layout";
import DocumentCard from "../components/DocumentCard";

function Documents() {
  return (
    <Layout>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Documents</h1>
        <button className="rounded-xl bg-white px-4 py-2 text-black">+ Upload</button>
      </div>

      <p className="mt-2 text-zinc-400">All your documents in one place.</p>

      <input
        type="text"
        placeholder="Search documents..."
        className="mt-6 w-full rounded-xl bg-zinc-900 p-4 text-white outline-none border border-zinc-800"
      />

      <div className="mt-8 flex gap-3">

      <button className="rounded-lg bg-zinc-800 px-4 py-2">Identity</button>

      <button className="rounded-lg bg-zinc-800 px-4 py-2">Education</button>

      <button className="rounded-lg bg-zinc-800 px-4 py-2">Financial</button>

      <button className="rounded-lg bg-zinc-800 px-4 py-2">Medical</button>

      <button className="rounded-lg bg-zinc-800 px-4 py-2">Other</button>
      </div>

      <h2 className="mt-10 mb-4 text-2xl font-semibold">
        All Documents
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <DocumentCard
          title="Passport.pdf"
          category="Identity"
        />

        <DocumentCard
          title="PAN Card.pdf"
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

    </Layout>
  );
}

export default Documents;