import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/api";
import ChangePasswordModal from "../components/ChangePasswordModal";
import DeleteAccountModal from "../components/DeleteAccountModal";

function Settings() {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);

    } catch (error) {
      console.log(error);
    }
  };

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
    fetchProfile();
    fetchDocuments();
  }, []);

  const totalDocuments = documents.length;

  const importantDocuments = documents.filter(
    (doc) => doc.important
  ).length;

  return (
    <Layout>
      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <p className="mt-2 text-zinc-400">
        Manage your account and vault preferences.
      </p>

      {/* Top Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold">
            Documents
          </h2>

          <p className="mt-4 text-4xl font-bold">
            {totalDocuments}
          </p>

          <p className="text-zinc-400">
            Uploaded Documents
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold">
            Important
          </h2>

          <p className="mt-4 text-4xl font-bold">
            {importantDocuments}
          </p>

          <p className="text-zinc-400">
            Pinned Documents
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold">
            Storage
          </h2>

          <p className="mt-4 text-4xl font-bold">
            coming soon
          </p>

          <p className="text-zinc-400">
            Storage tracking coming soon
          </p>
        </div>

      </div>

      {/* Profile + Preferences */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Profile
          </h2>

          <div className="space-y-3 text-zinc-300">
            <p>Name: {user?.name}</p>

            <p>Email: {user?.email}</p>

            <p>
              Member Since:{" "}
              {user
                ? new Date(user.createdAt).toLocaleDateString(): ""}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Preferences
          </h2>
          <p>Theme: Dark Mode</p>
        </div>

      </div>

      {/* Security */}
      <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Security
        </h2>

        <div className="flex flex-wrap gap-4">
          <button onClick={() => setIsPasswordOpen(true)}
            className="rounded-lg bg-zinc-800 px-4 py-2 transition hover:bg-zinc-700">
            Change Password
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-red-900 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold text-white">
          Account Management
        </h2>
        <p className="mb-6 text-sm text-zinc-400">
          Permanently delete your account and all uploaded documents.
          This action cannot be undone.
        </p>

        <button onClick={() => setIsDeleteOpen(true)}
          className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
      <ChangePasswordModal
        isOpen={isPasswordOpen}
        onClose={() => setIsPasswordOpen(false)}
      />
      <DeleteAccountModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      />
    </Layout>
  );
}

export default Settings;