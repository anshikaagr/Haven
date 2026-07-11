import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <form
        onSubmit={handleLogin}
        className="w-[400px] rounded-2xl bg-zinc-900 p-8"
      >
        <h1 className="mb-6 text-3xl font-bold text-white">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-zinc-200"
        >
          Login
        </button>

        <p className="mt-5 text-center text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-white hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;