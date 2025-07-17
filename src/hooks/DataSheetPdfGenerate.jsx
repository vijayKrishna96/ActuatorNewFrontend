import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import axios from "axios";

const DatasheetPDFGenerator = () => {
  

  const generatePDF = async () => {
  const container = document.getElementById("datasheet-container");

  try {
    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");

    // Set a higher scale for better quality
    const scale = 2;

    // Capture the entire datasheet as one image
    const canvas = await html2canvas(container, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: container.scrollWidth,
      height: container.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      logging: false,
      letterRendering: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate the aspect ratio of the content
    const contentAspectRatio = canvas.width / canvas.height;
    const pageAspectRatio = pdfWidth / pdfHeight;
    
    let finalWidth, finalHeight, xPos = 0, yPos = 0;
    
    if (contentAspectRatio > pageAspectRatio) {
      // Content is wider - fit to width
      finalWidth = pdfWidth;
      finalHeight = pdfWidth / contentAspectRatio;
      yPos = (pdfHeight - finalHeight) / 2;
    } else {
      // Content is taller - fit to height
      finalHeight = pdfHeight;
      finalWidth = pdfHeight * contentAspectRatio;
      xPos = (pdfWidth - finalWidth) / 2;
    }
    
    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", xPos, yPos, finalWidth, finalHeight, undefined, 'FAST');

    // Save the PDF
    pdf.save(`actuator-datasheet-${data.header.actuatorPartNumber || "unknown"}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error generating PDF. Please try again.");
  }
};

const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ACTUATOR_CONFIG}`);
      // Get the last item in the array
      setApiData(response.data[response.data.length - 1]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

const transformData = (apiData) => {
    if (!apiData) return null;

    return {
      header: {
        version: "1.0", // You might want to get this from API or make it configurable
        docRef: "DOC-REF-001", // This should come from API if available
        docGenDate: new Date().toLocaleDateString('en-GB'),
        customer: apiData.valveInfo?.customer || "",
        itemTag: apiData.valveInfo?.itemTag || "",
        enquiryRef: apiData.valveInfo?.enquiryRef || "",
        quotationNumber: apiData.valveInfo?.quotationNumber || "",
        requestedDate: apiData.valveInfo?.requestedDate || new Date().toLocaleDateString('en-GB'),
        createdBy: apiData.userId?.name || "Public",
        actuatorPartNumber: apiData.partNumber || `${apiData.series}-${apiData.actuatorSize}` || "Part Number Not Available"
      },
      valveInfo: {
        "Brand/Make": `${apiData.valveInfo?.stemDiameter?.value || ''} ${apiData.valveInfo?.stemDiameter?.unit || ''}`,
        "Valve Type": apiData.valveInfo?.valveType || "N/A",
        "Valve Size": apiData.valveInfo?.valveSize || "mm",
        "Series/Model": apiData.valveInfo?.seriesModel || "",
        "Additional Information": apiData.valveInfo?.additionalInfo || "N/A",
        "Differential Pressure": apiData.valveInfo?.differentialPressure || "bar",
        "Mounting Flange": apiData.valveInfo?.mountingFlange || "N/A",
        "Stem Diameter": `${apiData.valveInfo?.stemDiameter?.value || 'Metric'} ${apiData.valveInfo?.stemDiameter?.unit || ''}`,
        "VMC": apiData.valveInfo?.vmc || "",
        "Stem Material": apiData.valveInfo?.stemMaterial || "",
        "MAST Value": apiData.valveInfo?.mastValue || "Nm",
      },
      actuatorSpec: {
        "Series": apiData.series || "N/A",
        "Actuator Size": apiData.actuatorSize || "N/A",
        "Actuator Model": apiData.actuatorModel || "N/A",
        "Bore Size": apiData.boreSize || "N/A",
        "Cylinder Size": apiData.cylinderSize || "N/A",
         "Spring Size": apiData.springSize || "N/A",
        "Base Code": apiData.baseCode || "N/A",
        "Action": apiData.action || "N/A",
        "Mounting/Yoke": apiData.mountingYoke || "N/A",
        "Standard Options": apiData.standardOptions[0] || "N/A",
        "Ports": apiData.ports || "N/A",
        "Design code": apiData.designCode || "N/A",
        "Material": apiData.material || "N/A",
        "Temp Trim": apiData.tempTrim[0] || "N/A",
        "Coatings": apiData.coatings[0] || "N/A",
        "Orientation": apiData.orientation || "N/A",
      },
      valveTorques: [
        { operation: "Break to Open", value: apiData.valveTorques?.breakToOpen || 0, unit: "Nm" },
        { operation: "Run to Open", value: apiData.valveTorques?.runToOpen || 0, unit: "Nm" },
        { operation: "End to Open", value: apiData.valveTorques?.endToOpen || 0, unit: "Nm" },
        { operation: "Break to Close", value: apiData.valveTorques?.breakToClose || 0, unit: "Nm" },
        { operation: "Run to Close", value: apiData.valveTorques?.runToClose || 0, unit: "Nm" },
        { operation: "End to Close", value: apiData.valveTorques?.endToClose || 0, unit: "Nm" }
      ],
      actuatorTorques: [
        { 
          type: "Pneumatic Start", 
          value: apiData.actuatorTorques?.pneumaticStart || 0, 
          unit: "Nm",
          actual: apiData.actualSF?.pneumaticStart?.toFixed(2) || "N/A"
        },
        { 
          type: "Pneumatic Min", 
          value: apiData.actuatorTorques?.pneumaticMin || 0, 
          unit: "Nm",
          actual: apiData.actualSF?.pneumaticMin?.toFixed(2) || "N/A"
        },
        { 
          type: "Pneumatic End", 
          value: apiData.actuatorTorques?.pneumaticEnd || 0, 
          unit: "Nm",
          actual: apiData.actualSF?.pneumaticEnd?.toFixed(2) || "N/A"
        },
        { 
          type: "Spring Start", 
          value: apiData.actuatorTorques?.springStart || 0, 
          unit: "Nm",
          actual: apiData.actualSF?.springStart?.toFixed(2) || "N/A"
        },
        { 
          type: "Spring Min", 
          value: apiData.actuatorTorques?.springMin || 0, 
          unit: "Nm",
          actual: apiData.actualSF?.springMin?.toFixed(2) || "N/A"
        },
        { 
          type: "Spring End", 
          value: apiData.actuatorTorques?.springEnd || 0, 
          unit: "Nm",
          actual: apiData.actualSF?.springEnd?.toFixed(2) || "N/A"
        }
      ]
    };
  };


  // Transform the API data
  const data = transformData(apiData);

  // Return loading state if no data
  if (!data) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading actuator data...</p>
      </div>
    );
  }

  // Rest of your component remains the same...
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!apiData) return <div>No data found</div>;

  return (
    <>
    <div
      style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "11px",
          display: "flex",
          justifyContent: "center",
        }}
    >
      
        {/* Main Datasheet Container */}
        <div
          id="datasheet-container"
          style={{
            backgroundColor: "white",
            width: "190mm",
            fontSize: "12px",
            padding: "10px",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {/* Header Section */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid black",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    borderRight: "1px solid black",
                    padding: "8px",
                    width: "25%",
                    verticalAlign: "top",
                  }}
                >
                  <div
                    style={{
                      color: "#0D47A1",
                      fontSize: "24px",
                      fontWeight: "bold",
                      fontFamily: "serif",
                    }}
                  >
                    KSB
                  </div>
                </td>
                <td
                  style={{
                    borderRight: "1px solid black",
                    textAlign: "center",
                    width: "50%",
                  }}
                >
                  <div
                    style={{
                      color: "#0D47A1",
                      fontWeight: "bold",
                      fontSize: "13px",
                      marginBottom: "8px",
                    }}
                  >
                    Actuator Sizing Data
                  </div>
                  <div style={{ fontSize: "11px" }}>
                    Version {data.header.version}
                  </div>
                </td>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
                    {data.header.docRef}
                  </div>
                  <div style={{ fontSize: "9px" }}>
                    Doc. Gen. Date : {data.header.docGenDate}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Customer Information */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid black",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "4px",
                    backgroundColor: "#f8f9fa",
                    width: "15%",
                    fontSize: "9px",
                  }}
                >
                  Customer
                </td>
                <td
                  style={{
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "4px",
                    width: "35%",
                  }}
                >
                  {data.header.customer}
                </td>
                <td
                  style={{
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "4px",
                    backgroundColor: "#f8f9fa",
                    width: "15%",
                    fontSize: "9px",
                  }}
                >
                  Item # / Tag #
                </td>
                <td
                  style={{
                    borderBottom: "1px solid black",
                    padding: "4px",
                    width: "35%",
                  }}
                >
                  {data.header.itemTag}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "4px",
                    backgroundColor: "#f8f9fa",
                    fontSize: "9px",
                  }}
                >
                  Enquiry Ref.
                </td>
                <td
                  style={{
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "4px",
                  }}
                >
                  {data.header.enquiryRef}
                </td>
                <td
                  style={{
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "4px",
                    backgroundColor: "#f8f9fa",
                    fontSize: "9px",
                  }}
                >
                  Quotation #
                </td>
                <td
                  style={{
                    borderBottom: "1px solid black",
                    padding: "4px",
                  }}
                >
                  {data.header.quotationNumber}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "4px",
                    backgroundColor: "#f8f9fa",
                    fontSize: "9px",
                  }}
                >
                  Requested Date
                </td>
                <td
                  style={{
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "4px",
                  }}
                >
                  {data.header.requestedDate}
                </td>
                <td
                  style={{
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "4px",
                    backgroundColor: "#f8f9fa",
                    fontSize: "9px",
                  }}
                >
                  Created by
                </td>
                <td
                  style={{
                    borderBottom: "1px solid black",
                    padding: "4px",
                  }}
                >
                  {data.header.createdBy}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    borderRight: "1px solid black",
                    padding: "4px",
                    backgroundColor: "#f8f9fa",
                    fontSize: "9px",
                  }}
                >
                  Actuator Part Number :
                </td>
                <td
                  colSpan="3"
                  style={{
                    padding: "4px",
                    fontFamily: "monospace",
                    fontWeight: "bold",
                  }}
                >
                  {data.header.actuatorPartNumber}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Main Content Grid */}
          <div style={{ display: "flex", border: "1px solid black" }}>
            {/* Valve Information */}
            <div
              style={{
                flex: 1,
                borderRight: "1px solid black",
                padding: "2px",
              }}
            >
              <div
                style={{
                  padding: "4px",
                  color: "#0D47A1",
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginBottom: "2px",
                }}
              >
                Valve related Information :
              </div>
              <div style={{ padding: "2px" }}>
                {Object.entries(data.valveInfo).map(([key, value], index) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      padding: "3px 0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "9px",
                        width: "50%",
                        paddingRight: "8px",
                      }}
                    >
                      {key}
                    </div>
                    <div
                      style={{
                        fontSize: "9px",
                        flex: 1,
                        wordBreak: "break-word",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actuator Specification */}
            <div
              style={{
                flex: 1,
                padding: "4px",
              }}
            >
              <div
                style={{
                  padding: "4px",
                  color: "#0D47A1",
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                Actuator Specification:
              </div>
              <div style={{ padding: "2px" }}>
                {Object.entries(data.actuatorSpec).map(([key, value], index) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      padding: "3px 0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "9px",
                        width: "40%",
                        paddingRight: "8px",
                      }}
                    >
                      {key}
                    </div>
                    <div
                      style={{
                        fontSize: "9px",
                        flex: 1,
                        wordBreak: "break-word",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pressure Information Bar */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid black",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "4px",
                    textAlign: "center",
                    fontSize: "9px",
                    width: "25%",
                  }}
                >
                  Mounting Kit
                </td>
                <td
                  style={{
                    padding: "4px",
                    textAlign: "center",
                    fontSize: "9px",
                    width: "25%",
                  }}
                >
                  <div style={{ fontSize: "8px", marginBottom: "2px" }}>
                    Supply Pressure
                  </div>
                  <div style={{ fontWeight: "bold" }}>{apiData?.supplyPressure || 3.4} bar</div>
                </td>
                <td
                  style={{
                    padding: "4px",
                    textAlign: "center",
                    fontSize: "9px",
                    width: "25%",
                  }}
                >
                  <div style={{ fontSize: "8px", marginBottom: "2px" }}>
                    Maximum Operating Pressure
                  </div>
                  <div style={{ fontWeight: "bold" }}>{apiData?.mop || 10} bar</div>
                </td>
                <td
                  style={{
                    padding: "4px",
                    textAlign: "center",
                    fontSize: "9px",
                    width: "25%",
                  }}
                >
                  <div style={{ fontSize: "8px", marginBottom: "2px" }}>
                    Required Safety Factor
                  </div>
                  <div style={{ fontWeight: "bold" }}>1.25</div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Torque Tables */}
          <div style={{ display: "flex", border: "1px solid black" }}>
            {/* Valve Torques */}
            <div style={{ flex: 1, borderRight: "1px solid black" }}>
              <div style={{ padding: "8px 68px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
                  <thead>
                    <tr>
                      <th
                        colSpan="3"
                        style={{
                          borderBottom: "1px solid black",
                          padding: "4px",
                          backgroundColor: "#f8f9fa",
                          textAlign: "left",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Valve Torques
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.valveTorques.map((torque, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            padding: "2px 4px",
                            fontSize: "9px",
                            width: "60%",
                          }}
                        >
                          {torque.operation}
                        </td>
                        <td
                          style={{
                            padding: "2px 4px",
                            textAlign: "center",
                            fontSize: "9px",
                            width: "25%",
                          }}
                        >
                          {torque.value}
                        </td>
                        <td
                          style={{
                            padding: "3px 4px",
                            textAlign: "center",
                            fontSize: "9px",
                            width: "15%",
                          }}
                        >
                          {torque.unit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actuator Torques */}
            <div style={{ flex: 1 }}>
              <div style={{ padding: "8px 68px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
                  <thead>
                    <tr>
                      <th
                        colSpan="3"
                        style={{
                          borderBottom: "1px solid black",
                          padding: "4px",
                          backgroundColor: "#f8f9fa",
                          textAlign: "left",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Actuator Torques
                      </th>
                      <th
                        style={{
                          borderBottom: "1px solid black",
                          padding: "4px",
                          backgroundColor: "#f8f9fa",
                          textAlign: "center",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Actual S.f
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.actuatorTorques.map((torque, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            padding: "3px 4px",
                            fontSize: "9px",
                            width: "45%",
                          }}
                        >
                          {torque.type}
                        </td>
                        <td
                          style={{
                            padding: "3px 4px",
                            textAlign: "center",
                            fontSize: "9px",
                            width: "20%",
                          }}
                        >
                          {torque.value}
                        </td>
                        <td
                          style={{
                            padding: "3px 4px",
                            textAlign: "center",
                            fontSize: "9px",
                            width: "15%",
                          }}
                        >
                          {torque.unit}
                        </td>
                        <td
                          style={{
                            padding: "3px 4px",
                            textAlign: "center",
                            fontSize: "9px",
                            width: "20%",
                          }}
                        >
                          {torque.actual}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        {/* Chart Section */}
        <div
          style={{
            display: "flex",
            border: "1px solid black",
            borderTop: "none",
          }}
        >
          {/* Torque Output Chart */}
          <div
            style={{
              flex: 1,
              padding: "12px",
              borderRight: "1px solid black",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "8px",
                textAlign: "center",
                fontSize: "11px",
              }}
            >
              Torque Output
            </div>

            {/* Chart Container */}
            <div
              style={{
                height: "160px",
                backgroundColor: "white",
                border: "1px solid #ddd",
                position: "relative",
                marginBottom: "8px",
              }}
            >
              <svg
                style={{ width: "100%", height: "100%" }}
                viewBox="0 0 400 160"
              >
                {/* Grid lines */}
                {Array.from({ length: 11 }, (_, i) => (
                  <line
                    key={`grid-x-${i}`}
                    x1={50 + i * 30}
                    y1={15}
                    x2={50 + i * 30}
                    y2={135}
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                  />
                ))}
                {Array.from({ length: 7 }, (_, i) => (
                  <line
                    key={`grid-y-${i}`}
                    x1={50}
                    y1={15 + i * 20}
                    x2={350}
                    y2={15 + i * 20}
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Chart lines */}
                <polyline
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  points="50,35 80,40 110,45 140,50 170,55 200,60 230,65 260,70 290,75 320,80 350,85"
                />
                <polyline
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="2"
                  points="50,105 80,100 110,95 140,90 170,85 200,80 230,75 260,80 290,85 320,90 350,95"
                />
                <polyline
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  points="50,75 80,75 110,75 140,75 170,75 200,75 230,75 260,75 290,75 320,75 350,75"
                />

                {/* Y-axis labels */}
                <text
                  x="45"
                  y="140"
                  textAnchor="end"
                  style={{ fontSize: "7px" }}
                >
                  0
                </text>
                <text
                  x="45"
                  y="120"
                  textAnchor="end"
                  style={{ fontSize: "7px" }}
                >
                  2000
                </text>
                <text
                  x="45"
                  y="100"
                  textAnchor="end"
                  style={{ fontSize: "7px" }}
                >
                  4000
                </text>
                <text
                  x="45"
                  y="80"
                  textAnchor="end"
                  style={{ fontSize: "7px" }}
                >
                  6000
                </text>
                <text
                  x="45"
                  y="60"
                  textAnchor="end"
                  style={{ fontSize: "7px" }}
                >
                  8000
                </text>
                <text
                  x="45"
                  y="40"
                  textAnchor="end"
                  style={{ fontSize: "7px" }}
                >
                  10000
                </text>
                <text
                  x="45"
                  y="20"
                  textAnchor="end"
                  style={{ fontSize: "7px" }}
                >
                  12000
                </text>

                {/* X-axis labels */}
                <text
                  x="50"
                  y="150"
                  textAnchor="middle"
                  style={{ fontSize: "7px" }}
                >
                  0
                </text>
                <text
                  x="110"
                  y="150"
                  textAnchor="middle"
                  style={{ fontSize: "7px" }}
                >
                  15
                </text>
                <text
                  x="170"
                  y="150"
                  textAnchor="middle"
                  style={{ fontSize: "7px" }}
                >
                  30
                </text>
                <text
                  x="230"
                  y="150"
                  textAnchor="middle"
                  style={{ fontSize: "7px" }}
                >
                  45
                </text>
                <text
                  x="290"
                  y="150"
                  textAnchor="middle"
                  style={{ fontSize: "7px" }}
                >
                  60
                </text>
                <text
                  x="350"
                  y="150"
                  textAnchor="middle"
                  style={{ fontSize: "7px" }}
                >
                  75
                </text>

                {/* Axis labels */}
                <text
                  x="200"
                  y="158"
                  textAnchor="middle"
                  style={{ fontSize: "8px" }}
                >
                  Shaft Angle, degrees
                </text>
                <text
                  x="20"
                  y="75"
                  textAnchor="middle"
                  style={{ fontSize: "8px" }}
                  transform="rotate(-90 20 75)"
                >
                  Torque, Nm
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                fontSize: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "15px",
                    height: "2px",
                    backgroundColor: "#2563eb",
                    marginRight: "4px",
                  }}
                ></div>
                <span>Pneumatic</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "15px",
                    height: "2px",
                    backgroundColor: "#ea580c",
                    marginRight: "4px",
                  }}
                ></div>
                <span>Spring</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "15px",
                    height: "2px",
                    backgroundColor: "#000000",
                    marginRight: "4px",
                  }}
                ></div>
                <span>Valve</span>
              </div>
            </div>
          </div>

          {/* Actuator Diagram */}
          <div
            style={{
              flex: 1,
              padding: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="140"
              height="120"
              viewBox="0 0 140 120"
              style={{ margin: "0 auto" }}
            >
              {/* Main actuator body */}
              <rect
                x="10"
                y="30"
                width="120"
                height="50"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                rx="6"
              />

              {/* Top connection */}
              <rect
                x="50"
                y="18"
                width="40"
                height="15"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                rx="3"
              />

              {/* Center circle */}
              <circle
                cx="70"
                cy="25"
                r="6"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />

              {/* Shaft */}
              <line
                x1="70"
                y1="80"
                x2="70"
                y2="105"
                stroke="#000"
                strokeWidth="3"
              />

              {/* Bottom connection */}
              <circle
                cx="70"
                cy="110"
                r="8"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />

              {/* Side ports */}
              <circle
                cx="25"
                cy="55"
                r="3"
                fill="none"
                stroke="#000"
                strokeWidth="1.5"
              />
              <circle
                cx="115"
                cy="55"
                r="3"
                fill="none"
                stroke="#000"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            fontSize: "8px",
            color: "#666",
            padding: "6px",
            border: "1px solid black",
            borderTop: "none",
            textAlign: "left",
          }}
        >
          Public - Doc. Gen. Date : 19/6/2025 - User Defined
        </div>
      </div>
    </div>
    <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={generatePDF}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Export To PDF
        </button>
      </div>
    </>
  );
};

export default DatasheetPDFGenerator;
