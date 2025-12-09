import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [signups, setSignups] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!adminToken) {
      window.location.href = "/admin/login";
      return;
    }

    axios
      .get("http://localhost:5000/api/signups", {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then((res) => {
        const list = res.data.data || [];
        setSignups(list);
        setFiltered(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unauthorized or server error");
        setLoading(false);
      });
  }, []);

  // Search filter
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      signups.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.phone.toLowerCase().includes(q)
      )
    );
  }, [search, signups]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white/80 backdrop-blur shadow p-4 rounded-xl sticky top-0 z-20">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search name, email, phone..."
          className="w-full p-3 border rounded-lg shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Content Card */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Latest Signups</h2>

        {/* Loading state */}
        {loading && <p className="text-gray-500">Loading...</p>}

        {/* Error */}
        {error && <p className="text-red-500 mb-3">{error}</p>}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <p className="text-gray-500 text-center py-6">No signups found.</p>
        )}

        {/* Table */}
        {filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Phone</th>
                  <th className="border p-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50 transition">
                    <td className="border p-3">{s.name}</td>
                    <td className="border p-3">{s.email}</td>
                    <td className="border p-3">{s.phone}</td>
                    <td className="border p-3">
                      {new Date(s.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
