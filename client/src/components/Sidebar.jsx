import { NavLink , useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  LayoutDashboard,
  FileText,
  Star,
 Clock3,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <aside className="w-64 border-r border-zinc-800 p-6">
      <div>
      <h1 className="text-3xl font-bold tracking-wide">Haven</h1>
      <p className="mt-1 text-xs text-zinc-500">
        Always know where it is.
      </p>
      </div>

      <nav className="mt-10 flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
              isActive
                ? "bg-zinc-800 text-white": "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}>
          <LayoutDashboard size={20} />Dashboard</NavLink>

        <NavLink
          to="/documents"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
              isActive
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`
          }
        >
          <FileText size={20} />
          Documents
        </NavLink>

        <NavLink
          to="/important"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
              isActive
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`
          }
        >
          <Star size={20} />
          Important
        </NavLink>

        <NavLink
          to="/expiry"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
              isActive
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`
          }
        >
          <Clock3 size={20} />
          Expiry
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
              isActive
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`
          }
        >
          <Settings size={20} />
          Settings
        </NavLink>

      </nav>
            
      <button
        onClick={handleLogout}
        className="mt-10 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-white transition-all duration-200 hover:bg-red-600">
        < LogOut size={18} /> Logout
        </button>
    </aside>
  );
}

export default Sidebar;