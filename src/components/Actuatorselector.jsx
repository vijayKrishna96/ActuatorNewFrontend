import React, { useState } from "react";

const ActuatorSelector = () => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className="space-y-4 text-[12px]">
      {/* <-- wrapper div added */}
      <div className="grid grid-cols-3 gap-2">
        {/* Supply Pressure */}
        <div>
          <h2 className="font-bold">Actuator Selector</h2>
          <label className=" font-bold block mb-2">Supply Pressure:</label>
          <div className="flex items-center gap-2">
            <select className="bg-[#d9d9d9] text-gray-700 px-2 py-1 rounded w-[100px]">
              <option>SELECT</option>
            </select>
            <span className="text-black">bar</span>
          </div>
        </div>

        {/* Actuator Type */}
        <div>
          <label className="font-bold block mb-2 pt-[23px]">
            Actuator Type:
          </label>
          <div className="flex flex-col gap-2 mt-2">
            <label className="flex items-center gap-1 text-black">
              <input type="radio" name="actuatorType" defaultChecked />
              Spring Return
            </label>
            <label className="flex items-center gap-1 text-black">
              <input type="radio" name="actuatorType" />
              Double Acting
            </label>
          </div>
        </div>

        {/* Actuator Series */}
        <div>
          <label className="font-bold block mb-2 pt-[23px]">
            Actuator Series:
          </label>
          <div className="flex flex-col space-y-1">
            {[
              "S92/93 - Rack & Pinion Actuator",
              "S92/93EH - R&P Electro Hydraulic Actuator",
              "S98 - Pneumatic Scotch Yoke Actuator",
              "S98H - Hydraulic Scotch Yoke Actuator",
              "S98EH - SY Electro Hydraulic Actuator",
            ].map((series, i) => (
              <label
                key={i}
                className="flex items-center gap-1 text-black flex-wrap"
              >
                <input type="radio" name="series" defaultChecked={i === 0} />
                {series}
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* Second Row: Actuator Selected, Fail Safe, Orientation */}
      <div className="grid grid-cols-3 gap-8">
        {/* Actuator Selected */}
        <div>
          <label className="font-bold block mb-1">Actuator Selected</label>
          <div className="space-y-2 text-black">
            {["Actuator Model", "Actuator Size", "No. of Spring"].map(
              (label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <label className="w-[120px]">{label}</label>
                  <input
                    type="text"
                    className="w-[120px] bg-[#d9d9d9] px-2 py-1 rounded"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Fail Safe Condition */}
        <div>
          <label className="font-semibold block mb-1">
            Fail Safe Condition
          </label>
          <div className="space-y-2 mt-1">
            <label className="flex items-center gap-1 text-black">
              <input type="radio" name="fail" defaultChecked />
              Fail Close (Fail Clockwise - FCW)
            </label>
            <label className="flex items-center gap-1 text-black">
              <input type="radio" name="fail" />
              Fail Open (Fail Counter Clockwise - FCCW)
            </label>
          </div>
        </div>

        {/* Orientation & Manual Override */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Act. Orientation</label>
            <select className="w-full bg-[#d9d9d9] text-black px-2 py-1 rounded">
              <option>Perpendicular To Pipe</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Manual Override</label>
            <select className="w-full bg-[#d9d9d9] px-2 py-1 rounded text-black">
              <option>None</option>
            </select>
          </div>
        </div>
      </div>
      {/* Button */}
      <div>
        <button
          className="bg-[#08549c] text-white px-6 py-2 rounded font-semibold cursor-pointer  hover:bg-blue-800 mt-[30px]"
          onClick={() => setShowButtons(true)}
        >
          Select Actuator
        </button>
        {showButtons && (
          <div className="flex gap-4 mt-4">
            <button className="bg-[#08549c] text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 cursor-pointer">
              Actuator Configuration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActuatorSelector;