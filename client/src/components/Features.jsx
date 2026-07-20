function Features() {
  return (
    <section id="features"
    className="bg-zinc-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">

        <h2 className="mb-12 text-center text-4xl font-bold">
          Everything you need
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-zinc-400">
          Haven brings all your important documents together in one secure,
          organized place so you can access them anytime.
        </p>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Instant Search
            </h3>

            <p className="text-zinc-400">
              Find documents instantly using OCR-powered search.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Important Documents
            </h3>

            <p className="text-zinc-400">
              Keep your most important records one click away.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-zinc-700">
            <h3 className="mb-3 text-xl font-semibold">
              Expiry Tracking
            </h3>

            <p className="text-zinc-400">
              Never miss renewals and important deadlines.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Features;