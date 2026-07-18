import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hero from "./pages/Hero";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Important from "./pages/Important";
import Expiry from "./pages/Expiry";
import Settings from "./pages/Settings";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Hero/>} />
      <Route path="/dashboard" element={<ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>} />
      <Route path="/documents" element={<ProtectedRoute>
      <Documents />
    </ProtectedRoute>} />
      <Route path="/important" element={<ProtectedRoute>
      <Important />
    </ProtectedRoute>} />
      <Route path="/expiry" element={<ProtectedRoute>
      <Expiry />
    </ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute>
      <Settings />
    </ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;