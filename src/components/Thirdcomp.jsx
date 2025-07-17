import React from "react";
export default function TorqueUI() {
  return (
    <div className="flex justify-center p-8 bg-white font-sans text-[12px]">
      <div className="grid grid-cols-3 gap-10 text-sm text-gray-800 items-start text-[12px]">
        {/* Valve Torques Column */}
        <div>
          {/* Dropdown aligned exactly with input fields */}
          <div className="flex items-center mb-3">
            <label className="w-28 text-[#08549c] font-semibold">
              Value Torques
            </label>
            <div className="" /> {/* Empty spacer to match label width */}
            <select className="w-36 h-7 bg-gray-100 border rounded px-2">
              <option>6 Values</option>
            </select>
          </div>
          {/* 6 Torque Input Fields */}
          {[
            "Break to Open",
            "Run to Open",
            "End to Open",
            "Break to Close",
            "Run to Close",
            "End to Close",
          ].map((label, i) => (
            <div key={i} className="flex items-center mb-2 ml-[1px]">
              <label className="w-36">{label}:</label>
              <input
                type="text"
                className="w-24 h-7 bg-gray-200 rounded border border-gray-300"
              />
              <span className="ml-2">Nm</span>
            </div>
          ))}
          <div className="mt-2 text-sm text-gray-500 ">(Seating)</div>
        </div>
        {/* Actuator Torques Column */}
        <div>
          <div className="text-[#08549c] font-semibold mb-5">
            Actuator Torques
          </div>
          {[
            "Hydraulic Start",
            "Hydraulic Min",
            "Hydraulic End",
            "Spring Start",
            "Spring Min",
            "Spring End",
          ].map((label, i) => (
            <div key={i} className="flex items-center mb-2">
              <label className="w-36">{label}:</label>
              <input
                type="text"
                className="w-24 h-7 bg-gray-200 rounded border border-gray-300 "
              />
              <span className="ml-2">Nm</span>
            </div>
          ))}
        </div>
        {/* Actual S.F Column */}
        <div>
          <div className="text-[#08549c] font-semibold mb-5">Actual S.F</div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="mb-2">
              <input
                type="text"
                className="w-24 h-7 bg-gray-200 rounded border border-gray-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// import React, { useState } from "react";

// export default function TorqueUI() {
//   const [torqueMode, setTorqueMode] = useState("3"); // "6" or "3"

//   const [valveTorques, setValveTorques] = useState({
//     breakToOpen: 237,
//     runToOpen: 71,
//     endToOpen: 71,
//     breakToClose: 71,
//     runToClose: 71,
//     endToClose: 237,
//   });

//   const handleBreakToOpenChange = (value) => {
//     const breakToOpen = parseFloat(value) || 0;

//     setValveTorques({
//       breakToOpen: breakToOpen,
//       runToOpen: Math.round(breakToOpen * 0.3),
//       endToOpen: Math.round(breakToOpen * 0.3),
//       breakToClose: Math.round(breakToOpen * 0.3),
//       runToClose: Math.round(breakToOpen * 0.3),
//       endToClose: breakToOpen,
//     });
//   };

//   const visibleTorqueFields =
//     torqueMode === "6"
//       ? [
//           ["Break to Open", "breakToOpen"],
//           ["Run to Open", "runToOpen"],
//           ["End to Open", "endToOpen"],
//           ["Break to Close", "breakToClose"],
//           ["Run to Close", "runToClose"],
//           ["End to Close", "endToClose"],
//         ]
//       : [
//           ["Break to Open", "breakToOpen"],
//           ["Running", "runToOpen"],
//           ["End to Close", "endToClose"],
//         ];

//   const actuatorFields =
//     torqueMode === "6"
//       ? [
//           "Pneumatic Start",
//           "Pneumatic Min",
//           "Pneumatic End",
//           "Spring Start",
//           "Spring Min",
//           "Spring End",
//         ]
//       : ["Pneumatic Start", "Min Run", "Spring End"];

//   const sfCount = torqueMode === "6" ? 6 : 3;

//   const maxRows = 6; // used for spacing consistency

//   return (
//     <div className="flex justify-center p-6 bg-white font-sans text-[12px]">
//       <div className="w-[900px] grid grid-cols-3 gap-6">
//         {/* Column 1: Valve Torques */}
//         <div>
//           <div className="flex items-center mb-4">
//             <span className="text-[#08549c] font-semibold mr-2">
//               Valve Torques :
//             </span>
//             <select
//               className="w-[120px] h-7 bg-gray-100 border rounded px-2"
//               value={torqueMode}
//               onChange={(e) => setTorqueMode(e.target.value)}
//             >
//               <option value="6">6 Values</option>
//               <option value="3">3 Values</option>
//             </select>
//           </div>

//           {/* Editable Torque Inputs */}
//           {visibleTorqueFields.map(([label, key], i) => (
//             <div key={i} className="flex items-center mb-2">
//               <label className="w-[110px]">{label}:</label>
//               <input
//                 className="w-[80px] h-7 bg-gray-200 rounded border border-gray-300 text-right px-2"
//                 type="number"
//                 value={valveTorques[key] ?? ""}
//                 onChange={(e) =>
//                   key === "breakToOpen"
//                     ? handleBreakToOpenChange(e.target.value)
//                     : setValveTorques((prev) => ({
//                         ...prev,
//                         [key]: parseFloat(e.target.value) || 0,
//                       }))
//                 }
//               />
//               <span className="ml-2">Nm</span>
//             </div>
//           ))}
//           {/* Add empty spacers to maintain height */}
//           {Array(maxRows - visibleTorqueFields.length)
//             .fill(0)
//             .map((_, i) => (
//               <div key={spacer1-${i}} className="mb-2 h-7" />
//             ))}

//           <div className="mt-2 text-gray-500 text-[11px]">( Seating )</div>
//         </div>

//         {/* Column 2: Actuator Torques */}
//         <div className="pl-[40px]">
//           <div className="text-[#08549c] font-semibold mb-[30px]">
//             Actuator Torques
//           </div>
//           {actuatorFields.map((label, i) => (
//             <div key={i} className="flex items-center mb-2">
//               <label className="w-[110px]">{label}:</label>
//               <input className="w-[80px] h-7 bg-gray-200 rounded border border-gray-300" />
//               <span className="ml-2">Nm</span>
//             </div>
//           ))}
//           {Array(maxRows - actuatorFields.length)
//             .fill(0)
//             .map((_, i) => (
//               <div key={spacer2-${i}} className="mb-2 h-7" />
//             ))}
//         </div>

//         {/* Column 3: Actual S.F */}
//         <div className="pl-[40px]">
//           <div className="text-[#08549c] font-semibold mb-[30px]">
//             Actual S.F
//           </div>
//           {[...Array(sfCount)].map((_, i) => (
//             <div key={i} className="mb-2">
//               <input className="w-[100px] h-7 bg-gray-200 rounded border border-gray-300" />
//             </div>
//           ))}
//           {Array(maxRows - sfCount)
//             .fill(0)
//             .map((_, i) => (
//               <div key={spacer3-${i}} className="mb-2 h-7" />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }
