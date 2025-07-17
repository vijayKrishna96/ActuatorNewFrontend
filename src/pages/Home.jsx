import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [actuators, setActuators] = useState([]);
  const [sort, setSort] = useState(""); // "price_asc" or "price_desc"
  const [type, setType] = useState("");
  const [size, setSize] = useState("");

  // Fetch actuators from backend with filters/sort as query params
  useEffect(() => {
    const fetchActuators = async () => {
      try {
        const params = {};
        if (sort) params.sort = sort;
        if (type) params.type = type;
        if (size) params.size = size;

        const query = new URLSearchParams(params).toString();
        const res = await fetch(
          `http://localhost:5000/api/valve/actuators${query ? "?" + query : ""}`
        );
        const data = await res.json();
        setActuators(data);
      } catch (error) {
        console.error("Error fetching actuators:", error);
      }
    };
    fetchActuators();
  }, [sort, type, size]);

  // Helper: get unique types from data for dropdown
  const uniqueTypes = Array.from(new Set(actuators.map(a => a.type))).filter(Boolean);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">Actuator Catalog</h1>

      {/* Sort and Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Sort by</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>

        {/* Filter by Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Filter by Type</option>
          {/* Dynamically render all unique types */}
          {uniqueTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Filter by Size */}
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Filter by Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>

      {/* Actuator Grid */}
      {actuators.length === 0 ? (
        <p>No actuators found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {actuators.map((actuator) => (
            <div
              key={actuator._id}
              className="border rounded-lg p-4 shadow bg-white"
            >
              <h2 className="text-lg font-semibold">{actuator.name}</h2>
              <p className="text-sm text-gray-600">Model: {actuator.modelNumber}</p>
              <p>Type: {actuator.type}</p>
              <p>Torque: {actuator.torque} Nm</p>
              <p>Rotation: {actuator.rotation}</p>
              <p>Size: {actuator.size}</p>
              <p className="font-bold text-green-600">₹{actuator.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}