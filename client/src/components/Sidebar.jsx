import { Link , useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <aside className="w-64 border-r border-zinc-800 p-6">
      <h1 className="mb-10 text-2xl font-bold">Haven</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/documents">Documents</Link>
        <Link to="/important">Important</Link>
        <Link to="/expiry">Expiry</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      
      <button
        onClick={handleLogout}
        className="mt-auto rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700">
        Logout</button>
    </aside>
  );
}

export default Sidebar;