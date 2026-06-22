function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 p-6">
      
      <h1 className="mb-10 text-2xl font-bold">Haven</h1>

      <nav className="flex flex-col gap-4">
        <button>Dashboard</button>
        <button>Documents</button>
        <button>Important</button>
        <button>Expiry</button>
        <button>Settings</button>
      </nav>

    </aside>
  );
}

export default Sidebar;