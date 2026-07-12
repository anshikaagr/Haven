import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/api";

function Settings() {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    fetchProfile();
  }, []);
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
            24
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
            5
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
            2.4GB
          </p>

          <p className="text-zinc-400">
            Used of 10GB
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

          <div className="space-y-3 text-zinc-300">
            <p>Theme: Dark Mode</p>
            <p>Notifications: Enabled</p>
          </div>
        </div>

      </div>

      {/* Security */}
      <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Security
        </h2>

        <div className="flex flex-wrap gap-4">
          <button className="rounded-lg bg-zinc-800 px-4 py-2">
            Change Password
          </button>
        </div>
      </div>

      {/* Account */}
      <div className="mt-8 rounded-xl border border-red-900 bg-zinc-900 p-6">
        <h2 className="mb-4 text-xl font-semibold text-red-400">
          Account
        </h2>
        <button className="rounded-lg bg-red-500 px-5 py-2 font-medium text-white">
          Logout
        </button>
      </div>

    </Layout>
  );
}

export default Settings;