function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-zinc-950/80 px-6 py-5 backdrop-blur-md">
      <h1 className="cursor-pointer text-xl font-bold tracking-wide">
        Haven
      </h1>
      <div className="flex items-center gap-8">
        <a href="#features"
          className="transition-colors duration-200 hover:text-zinc-300"> Features</a>
        <a href="#about"
          className="transition-colors duration-200 hover:text-zinc-300">About</a>
      </div>
    </nav>
  );
}

export default Navbar;