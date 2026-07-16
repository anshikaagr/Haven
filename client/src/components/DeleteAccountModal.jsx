import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

function DeleteAccountModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await api.delete("/auth/delete-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");

      toast.success("Account deleted successfully");

      navigate("/");

    } catch (error) {
        console.log(error);
        console.log(error.response);
        console.log(error.response?.data);

        toast.error(
            error.response?.data?.message || "Failed to delete account"
        );

      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[500px] rounded-2xl bg-zinc-900 p-6 shadow-2xl">

        <h2 className="text-2xl font-bold text-red-400">
          Delete Account
        </h2>

        <p className="mt-4 text-zinc-300">
          Are you sure you want to permanently delete your account?
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-400">
          <li>Your profile</li>
          <li>All uploaded documents</li>
          <li>Important documents</li>
          <li>Expiry records</li>
        </ul>

        <p className="mt-6 text-sm text-red-400">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-xl bg-zinc-700 px-5 py-3 text-white hover:bg-zinc-600"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className={`rounded-xl px-5 py-3 font-medium transition ${
              loading
                ? "cursor-not-allowed bg-zinc-500 text-white"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            {loading ? "Deleting..." : "Delete Account"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteAccountModal;