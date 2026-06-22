import { Link } from "react-router-dom";

function Sidebar() {
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
    </aside>
  );
}

export default Sidebar;