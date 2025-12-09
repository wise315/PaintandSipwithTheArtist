// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";

export const Admin = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const ADMIN_TOKEN =
    process.env.REACT_APP_ADMIN_TOKEN || "some-strong-secret-token"; // for dev

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:5000/api/signups", {
          headers: { "x-admin-token": ADMIN_TOKEN },
        });
        const j = await res.json();
        if (res.ok) setRows(j.data || []);
        else console.error(j);
      } catch (err) {
        console.error("Admin fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">Signups</h1>
      {loading ? <p>Loading…</p> : null}
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="py-2">{r.name}</td>
              <td>{r.phone}</td>
              <td>{r.email}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
