import React from "react";
import { useLocation } from "react-router-dom";

function ViewPage() {
  const location = useLocation();
  const formData = location.state;

  if (!formData) {
    return <div>No data provided.</div>;
  }

  return (
    <div className="p-8 font-sans text-[12px] text-black">
      <div className="border border-black">
        {/* Header */}
        <div className="grid grid-cols-3 border-b border-black">
          <div className="p-2">
            <img src="src/assets/KSB.png" alt="KSB" className="h-12" />
          </div>
          <div className="p-2 text-center text-[#08549c] font-bold">
            Actuator Sizing Data
            <div className="text-black font-normal text-sm">Version 4.8.3</div>
          </div>
          <div className="p-2 text-right">
            <div>Doc.Ref. {formData.docRef}</div>
            <div>Doc. Gen. Date : {formData.date}</div>
        </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-4 gap-0 border-b border-black">
          <div className="col-span-1 border-r border-black p-2">Customer</div>
          <div className="col-span-1 border-r border-black p-2">{formData.customer}</div>
          <div className="col-span-1 border-r border-black p-2">Item /tag:</div>
          <div className="col-span-1 p-2">{formData.itemTag}</div>

          <div className="col-span-1 border-r border-black p-2">Enquiry Ref.</div>
          <div className="col-span-1 border-r border-black p-2">{formData.enquiryRef}</div>
          <div className="col-span-1 border-r border-black p-2">Quotation:</div>
          <div className="col-span-1 p-2">{formData.quotation}</div>

          <div className="col-span-1 border-r border-black p-2">Date</div>
          <div className="col-span-1 border-r border-black p-2">{formData.date}</div>
          <div className="col-span-1 border-r border-black p-2">Created by</div>
          <div className="col-span-1 p-2">Public</div>

          <div className="col-span-4 border-t border-black p-2">
            Actuator Part Number : 98G1Q3-213D1**000*0
          </div>
        </div>

        {/* Valve and Actuator Info */}
        <div className="grid grid-cols-2 border-b border-black">
          <div className="border-r border-black p-2">
            <div className="text-[#08549c] font-semibold">Valve related Information :</div>
            <div>Brand / Make</div>
            <div>Valve Type: Ball</div>
            <div>Valve Size: mm</div>
            <div>Series / Model</div>
            <div>Additional Information: -</div>
            <div>Differential Pressure: bar</div>
            <div>Mounting Flange: F30</div>
            <div>Stem Diameter: Inch</div>
            <div>VMC</div>
            <div>Stem Material</div>
            <div>MAST Value: Nm</div>
          </div>
          <div className="p-2">
            <div className="text-[#08549c] font-semibold">Actuator Specification:</div>
            <div>Series: S98</div>
            <div>Actuator Size: 24E3</div>
            <div>Actuator Model: 24E3-24-SR3</div>
            <div>Bore Size: 4.5 inch</div>
            <div>Cylinder Size: 24 inch</div>
            <div>Spring Size: Spring 3</div>
            <div>Base Code: 213</div>
            <div>Action: Spring Return, Fail CCW</div>
            <div>Mounting / Yoke: ISO / Symmetric</div>
            <div>Ports: Single NPT (Standard)</div>
            <div>Standard Options: None</div>
            <div>Design Code: Standard Pneumatic</div>
            <div>Material: Standard</div>
            <div>Temp Trim: Standard (-29 degC to 93 degC)</div>
            <div>Coatings: Standard</div>
            <div>Orientation: 1H1</div>
          </div>
        </div>

        {/* Supply and Pressure Info */}
        <div className="flex border-b border-black">
          <div className="border-r border-black p-2">Mounting Kit</div>
          <div className="border-r border-black p-2">Supply Pressure 4.5 bar</div>
          <div className="border-r border-black p-2">Maximum Operating Pressure 5 bar</div>
          <div className="p-2">Required Safety Factor 1.25</div>
        </div>

        {/* Torques Table */}
        <div className="grid grid-cols-2">
          <div className="p-2">
            <div className="border border-black">
              <div className="border-b border-black bg-gray-100 font-semibold p-1">
                Valve Torques
              </div>
              <div className="p-1 border-b border-black">Break to Open 10000 Nm</div>
              <div className="p-1 border-b border-black">Run to Open 4000 Nm</div>
              <div className="p-1 border-b border-black">End to Open 4000 Nm</div>
              <div className="p-1 border-b border-black">Break to Close 4000 Nm</div>
              <div className="p-1 border-b border-black">Run to Close 4000 Nm</div>
              <div className="p-1">End to Close : (Seating) 9000 Nm</div>
            </div>
          </div>
          <div className="p-2">
            <div className="border border-black">
              <div className="grid grid-cols-3 border-b border-black bg-gray-100 font-semibold p-1">
                <div>Actuator Torques</div>
                <div></div>
                <div>Actual S.F</div>
              </div>
              <div className="grid grid-cols-3 border-b border-black p-1">
                <div>Spring Start</div><div>14916 Nm</div><div>1.49</div>
              </div>
              <div className="grid grid-cols-3 border-b border-black p-1">
                <div>Spring Min</div><div>6837 Nm</div><div>1.71</div>
              </div>
              <div className="grid grid-cols-3 border-b border-black p-1">
                <div>Spring End</div><div>9710 Nm</div><div>2.43</div>
              </div>
              <div className="grid grid-cols-3 border-b border-black p-1">
                <div>Pneumatic Start</div><div>18483 Nm</div><div>4.62</div>
              </div>
              <div className="grid grid-cols-3 border-b border-black p-1">
                <div>Pneumatic Min</div><div>8930 Nm</div><div>2.23</div>
              </div>
              <div className="grid grid-cols-3 p-1">
                <div>Pneumatic End</div><div>13135 Nm</div><div>1.46</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
