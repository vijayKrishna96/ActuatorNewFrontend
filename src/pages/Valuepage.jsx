import React, { useState, useEffect } from "react";

function Valuepage() {
  const [input, setInput] = useState("");
  const [seriesList, setSeriesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all series on mount so the list is always up to date
  useEffect(() => {
  const fetchSeries = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_FETCH_SERIES}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setSeriesList(data.data.map(s => s.name));
      }
    } catch {
      // ignore fetch error for now
    }
  };
  fetchSeries();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!input.trim()) return;
    setLoading(true);
        try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_CREATE_SERIES}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: input }),
      });
      const data = await res.json();
      if (data.success) {
        // Instead of just adding, fetch the updated list to avoid duplicates
        const res2 = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_FETCH_SERIES}`);
        const data2 = await res2.json();
        
        // handle `data2` as needed...
      
        if (data2.success && Array.isArray(data2.data)) {
          setSeriesList(data2.data.map(s => s.name));
        }
        setInput("");
      } else {
        setError(data.message || "Failed to add series");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <div className="max-h-screen bg-gray-50 flex">
      <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-md border border-gray-200 mt-8 ml-8 mb-8">
        <h2 className="text-xl font-bold text-[#08549c] mb-4 text-left tracking-wide">
          Add Actuator Series Type
        </h2>
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter actuator series type"
            className="flex-1 border border-gray-300 focus:border-[#08549c] focus:ring-2 focus:ring-[#08549c]/20 rounded-lg px-3 py-1 text-gray-700 shadow-sm transition-all duration-150 outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-[#08549c] hover:bg-blue-800 text-white px-4 py-1 rounded-lg font-semibold shadow transition-all duration-150 text-sm"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full align-middle"></span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded mb-3 text-center text-sm">
            {error}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-base text-[#08549c] mb-2 border-b pb-1 text-left">
            Actuator Series Types
          </h3>
          {seriesList.length === 0 ? (
            <div className="text-gray-400 text-left py-2 text-sm">
              No actuator series types added yet.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {seriesList.map((series, idx) => (
                <li
                  key={idx}
                  className="py-1 px-2 flex items-center justify-between hover:bg-gray-100 transition-all rounded text-sm"
                >
                  <span className="text-gray-700 font-medium">{series}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Valuepage;
