function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-5">
      <h1 className="text-xl font-bold">
        Haven
      </h1>

      <div className="flex gap-6">
        <a href="#">Features</a>
        <a href="#">About</a>
      </div>

      <button>
        🌙
      </button>
    </nav>
  );
}

export default Navbar;