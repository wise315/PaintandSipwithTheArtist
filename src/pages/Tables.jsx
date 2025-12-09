import react from "react";
import { useNavigate } from "react-router-dom";

const TABLES = [
  {
    id: "bronze",
    name: "Bronze Table",
    priceNGN: 100000,
    benefits: ["A bottle of Champagne", "Bottle water"],
  },
  {
    id: "silver",
    name: "Silver Table",
    priceNGN: 200000,
    benefits: ["Jameson", "Coke", "Bottle water"],
  },
  {
    id: "diamond",
    name: "Diamond Table",
    priceNGN: 300000,
    benefits: ["Jameson", "champagne"],
  },
  {
    id: "gold",
    name: "Gold Table",
    priceNGN: 500000,
    benefits: ["Don Julio"],
  },
  {
    id: "platinum",
    name: "Platinum Table",
    priceNGN: 1000000,
    benefits: ["Don Julio", "Coke"],
  },
];

export default function Tables() {
  const navigate = useNavigate();

  const handleSelect = (table) => {
    navigate("/pay", { state: { table } });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-4">Choose a Table</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {TABLES.map((t) => (
            <div key={t.id} className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">{t.name}</h3>
              <div className="text-2xl font-bold mb-3">
                ₦{t.priceNGN.toLocaleString()}
              </div>
              <ul className="mb-4 text-sm text-gray-600 space-y-1">
                {t.benefits.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
              <button
                onClick={() => handleSelect(t)}
                className="w-full py-2 rounded-lg bg-[#E63946] text-white font-semibold"
              >
                Reserve {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
