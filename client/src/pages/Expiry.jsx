import Layout from "../components/Layout";

function Expiry() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Expiry Center</h1>

      <p className="mt-2 text-zinc-400">Track documents that require renewal.</p>

      <div className="mt-8 grid gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="font-semibold">Passport</h3>

          <p className="mt-2 text-zinc-400">
            Expires in 95 days
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="font-semibold">Driving License</h3>

          <p className="mt-2 text-zinc-400">
            Expires in 208 days
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="font-semibold">Travel Insurance</h3>

          <p className="mt-2 text-zinc-400">
            Expires in 40 days
          </p>
        </div>

      </div>
    </Layout>
  );
}

export default Expiry;