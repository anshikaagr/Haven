import { Link , useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main className="flex h-[85vh] flex-col items-center justify-center px-6 text-center">
        
        <h1 className="text-6xl font-bold tracking-tight">Haven</h1>

        <p className="mt-4 text-xl text-zinc-400">
          Always know where it is.
        </p>

        <p className="mt-6 max-w-xl text-zinc-500">
          Upload, organize and instantly retrieve your important
          documents with intelligent search.
        </p>

        <div className="mt-10 flex gap-4">
          <button onClick={handleGetStarted}
            className="rounded-xl bg-white px-6 py-3 text-black hover:bg-zinc-200">
            Get Started </button>
          <button className="rounded-xl border border-zinc-700 px-6 py-3">Learn More</button>
        </div>

      </main>
    </div>
  );
}

export default Hero;