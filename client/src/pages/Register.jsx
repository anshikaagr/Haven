import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,});

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <form
        onSubmit={handleRegister}
        className="w-[400px] rounded-2xl bg-zinc-900 p-8"
      >
        <h1 className="mb-6 text-3xl font-bold text-white">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
        />

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
        >Register</button>

        <p className="mt-5 text-center text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white hover:underline"
          >Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;