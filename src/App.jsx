import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Navbar } from "./components/layout/Navbar";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { Success } from "./pages/Success";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

import Tables from "./pages/Tables";
import Payment from "./pages/Payment";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* Pulic pages */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/success" element={<Success />} />

        {/* Admin pages */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/*Payment page */}
        <Route path="/tables" element={<Tables />} />
        <Route path="/pay" element={<Payment />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <Navbar />

        <main className="pt-16">
          {" "}
          {/* Prevent hero overlap under navbar */}
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}
