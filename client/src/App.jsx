/*import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}

export default App;*/

/*import Dashboard from "./pages/Dashboard";

function App() {
  return <Dashboard />;
}

export default App;*/

import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Important from "./pages/Important";
import Expiry from "./pages/Expiry";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/important" element={<Important />} />
      <Route path="/expiry" element={<Expiry />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;