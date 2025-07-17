import React from "react";
import DatasheetPDFGenerator from "../hooks/DataSheetPdfGenerate";


function DataSheet() {
 

  const data = {
    header: {
      version: "4.8.3",
      docRef: "Doc.Gen. Date: 16/6/2025",
      customer: "",
      enquiryRef: "",
      requestedDate: "",
      actuatorPartNumber: "98D1J2-213C2*N00050",
      itemTag: "",
      quotationNumber: "",
      createdBy: "Public",
    },
    valveInfo: {
      "Brand / Make": "",
      "Valve Type": "Ball",
      "Valve Size": "mm",
      "Series / Model": "",
      "Additional Information": "-",
      "Differential Pressure": "bar",
      "Mounting Flange": "F16",
      "Stem Diameter": "Inch",
      VMC: "",
      "Stem Material": "",
      "MAST Value": "Nm",
    },
    actuatorSpec: {
      Series: "S98",
      "Actuator Size": "45E2",
      "Actuator Model": "45E2-12-SR2-C",
      "Bore Size": "1.969 Inch",
      "Cylinder Size": "12 Inch",
      "Spring Size": "Spring 2",
      "Supply Code": "213",
      Action: "Spring Return, Fail CW",
      "Mounting / Yoke": "ISO / Canted",
      Ports: "Single NPT (Standard)",
      "Standard Options": "None",
      "Design Code": "Standard Pneumatic",
      Material: "Standard",
      "Temp Trim": "Standard (-29 degC to 93 degC)",
      Coatings: "Standard",
      Orientation: "1H1",
    },
    valveTorques: [
      { operation: "Break to Open", value: 844, unit: "Nm" },
      { operation: "Run to Open", value: 555, unit: "Nm" },
      { operation: "End to Open", value: 555, unit: "Nm" },
      { operation: "Break to Close", value: 555, unit: "Nm" },
      { operation: "Run to Close", value: 555, unit: "Nm" },
      { operation: "End to Close (Seating)", value: 1205, unit: "Nm" },
    ],
    actuatorTorques: [
      { type: "Pneumatic Start", value: 1931, unit: "Nm", actual: 2.29 },
      { type: "Pneumatic Min", value: 714, unit: "Nm", actual: 1.29 },
      { type: "Pneumatic End", value: 933, unit: "Nm", actual: 1.68 },
      { type: "Spring Start", value: 1654, unit: "Nm", actual: 2.98 },
      { type: "Spring Min", value: 949, unit: "Nm", actual: 1.71 },
      { type: "Spring End", value: 1763, unit: "Nm", actual: 1.46 },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      <DatasheetPDFGenerator data={data} />
    </div>
  );
}

export default DataSheet;
