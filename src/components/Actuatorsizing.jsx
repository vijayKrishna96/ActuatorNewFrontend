// import React, { useState,useEffect } from "react";
// import ActuatorSelector from "./Actuatorselector";
// import ThirdComp from "./Thirdcomp";
// import actuatorImage from "../assets/actuator.jpg.jpeg";

// const EditableSelect = ({ options, placeholder, listId, defaultValue }) => {
//   const [value, setValue] = useState(defaultValue || "");
//   return (
//     <>
//       <input
//         list={listId}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder={placeholder}
//         className="bg-gray-200 rounded px-2 py-1 w-32"
//       />
//       <datalist id={listId}>
//         {options.map((opt, idx) => (
//           <option
//             key={idx}
//             value={opt}
//             style={
//               opt === "Metric" ? { color: "#08549c", fontWeight: "bold" } : {}
//             }
//           />
//         ))}
//       </datalist>
//     </>
//   );
// };


// export default function ActuatorSizing() {
//   const [valveData, setValveData] = useState([]);

//   const fetchValveData = async () => {
//     try{
//       const res = await fetch("http://localhost:5000/api/valve/", {
//       method: "GET"
//     })
//     const data = await res.json();
//     setValveData(data.data);
//     console.log(data , "data");
//     }catch{
//       console.error("Failed to fetch valve data");
//     }
//   }
//   useEffect(() => {
//     fetchValveData();
//   }, []);

//   const options = {
//     productBrand: ["Bray", "Velan", "Emerson"],
//     valveSeries: ["S21", "S22", "S23"],
//     discConfig: ["Full Disc", "Segmented", "Double Offset"],
//     appCategory: ["Class A", "Class B", "Class C"],
//     valveSize: ["100", "200", "350", "500"],
//     diffPressure: ["10", "20", "30"],
//     stemMaterial: ["SS316", "SS304", "Monel"],
//     unitType: ["Metric", "Inch"],
//   };

//   return (
//     <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 bg-gray-100 text-sm text-[#08549c] font-sans min-h-screen text-[12px]">
//       {/* Top Left: Valve Info */}
//       <div className="bg-white p-4 rounded-lg shadow-lg overflow-auto">
//         <div className="flex justify-between items-start">
//           <div className="w-[45%] space-y-2 text-black">
//             <p className="text-sm font-bold mb-2 text-[#08549c]">
//               Valve Information
//             </p>
//             <div className="space-y-2">
//               <div className="flex justify-between items-center">
//                 <p className="text-[#08549c] font-semibold">Unit Type:</p>
//                 <EditableSelect
//                   options={options.unitType}
//                   listId="unitType"
//                   defaultValue="Metric"
//                 />
//               </div>
//               <div className="flex justify-between items-center">
//                 <p>Product Brand:</p>
//                 <EditableSelect
//                   options={options.productBrand}
//                   listId="productBrand"
//                 />
//               </div>
//               <div className="flex justify-between items-center">
//                 <p>Valve Series:</p>
//                 <EditableSelect
//                   options={options.valveSeries}
//                   listId="valveSeries"
//                 />
//               </div>
//               <div className="flex justify-between items-center">
//                 <p>Disc Configuration:</p>
//                 <EditableSelect
//                   options={options.discConfig}
//                   listId="discConfig"
//                 />
//               </div>
//               <div className="flex justify-between items-center">
//                 <p>Application Category:</p>
//                 <EditableSelect
//                   options={options.appCategory}
//                   listId="appCategory"
//                 />
//               </div>
//               <div className="flex justify-between items-center">
//                 <p>Valve Size ( mm ):</p>
//                 <EditableSelect
//                   options={options.valveSize}
//                   listId="valveSize"
//                 />
//               </div>
//               <div className="flex justify-between items-center">
//                 <p>Differential Pressure:</p>
//                 <EditableSelect
//                   options={options.diffPressure}
//                   listId="diffPressure"
//                 />
//               </div>
//               <div className="flex justify-between items-center">
//                 <p>VMC:</p>
//                 <input
//                   type="text"
//                   className="bg-gray-200 rounded px-2 py-1 w-32"
//                 />
//               </div>
//               <div className="flex justify-between items-center">
//                 <p>Stem Material:</p>
//                 <EditableSelect
//                   options={options.stemMaterial}
//                   listId="stemMaterial"
//                 />
//               </div>
//               <div className="flex justify-between items-center">
//                 <p>Enter MAST Value:</p>
//                 <input
//                   type="text"
//                   className="rounded px-2 py-1 w-32 bg-gray-200"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="w-[50%] text-black">
//             <div className="flex justify-between items-center mb-2">
//               <p className="text-sm font-bold text-[#08549c]">
//                 Default Sizing Units
//               </p>
//               <button className="bg-[#08549c] cursor-pointer  hover:bg-blue-00 text-white px-4 py-1 rounded text-sm">
//                 Clear All
//               </button>
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <p>User Defined:</p>
//                 <input type="checkbox" className="form-checkbox mr-[230px]" />
//               </div>
//               <div className="flex items-center justify-between mr-[115px]">
//                 <p>Valve Type:</p>
//                 <EditableSelect
//                   options= {valveData.map(item => item.name)}
//                   listId="valveType"
//                 />
//               </div>
//               <div className="flex items-center justify-between">
//                 <p>Required Safety Factor:</p>
//                 <input
//                   type="text"
//                   className="border rounded px-1 py-1 w-10 bg-yellow-100 text-center mr-[150px]"
//                   defaultValue="1.25"
//                 />
//               </div>
//               <p className="text-xs text-gray-500 text-right mr-[130px]">
//                 (Example: 1.25)
//               </p>

//               <div className="flex items-center justify-between mt-10">
//                 <p className="text-[#08549c] font-bold">Stem Diameter:</p>
//                 <div className="flex items-center space-x-3">
//                   <label className="flex items-center space-x-1">
//                     <input type="radio" name="stemUnit" />
//                     <span>Inch</span>
//                   </label>
//                   <label className="flex items-center space-x-1">
//                     <input type="radio" name="stemUnit" defaultChecked />
//                     <span>Metric</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="border rounded px-2 py-1 w-16"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Top Right: Actuator Selector - Adjusted to remove scroll and allow wrapping */}
//       <div className="bg-white p-4 shadow-lg rounded-lg">
//         <ActuatorSelector />
//       </div>

//       {/* Bottom Left: Third Component */}
//       <div className="bg-white p-4 shadow-lg rounded-lg">
//         <ThirdComp />
//       </div>

//       {/* Bottom Right: Image */}
//       <div className="bg-white shadow-lg rounded-lg flex items-center justify-center h-full min-h-[400px] ">
//         <img
//           src={actuatorImage}
//           alt="Actuator"
//           className="object-contain max-h-[400px] max-w-[100%] w-auto h-auto pb-[100px]"
//         />
//       </div>
//     </div>
//   );
// }
