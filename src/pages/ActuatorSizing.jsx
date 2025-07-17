import React, { useState, useEffect } from "react";
import "../styles/actuatorSizing.css";
import { useContext } from "react";
import { AuthContext } from "../config/AuthContext";

// Helper Components
const EditableSelect = ({
  options = [],
  listId,
  value,
  onChange,
  className = "editable-select",
}) => (
  <>
    <input
      list={listId}
      value={value}
      onChange={onChange}
      className={className}
    />
    <datalist id={listId}>
      {options.map((opt, idx) => (
        <option key={idx} value={opt} />
      ))}
    </datalist>
  </>
);

const RadioGroup = ({ name, options, value, onChange }) => (
  <div className="radio-group">
    {options.map((option, i) => (
      <label
        key={i}
        className={`radio-label ${option.disabled ? "disabled" : ""}`}
      >
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={() => !option.disabled && onChange(option.value)}
          disabled={option.disabled}
        />
        {option.label}
      </label>
    ))}
  </div>
);

const InputField = ({
  label,
  unit,
  value,
  onChange,
  className = "input-field",
  type = "text",
  disabled = false,
}) => (
  <div className="input-container">
    <label className="input-label">{label}:</label>
    <input
      type={type}
      className={className}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {unit && <span className="input-unit">{unit}</span>}
  </div>
);

// Main Component
export default function ActuatorSizing({ setActiveTab }) {
  const [valveData, setValveData] = useState([]);
  const [valveType, setValveType] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [torques, setTorques] = useState(["", "", "", "", "", ""]);
  const [actuatorSeries, setActuatorSeries] = useState([]);
  const [pedOption, setPedOption] = useState("Non PED");
  const [selectedSeries, setSelectedSeries] = useState("");
  const [stemUnit, setStemUnit] = useState("Metric");
  const [stemDiameter, setStemDiameter] = useState("");
  const [safetyFactor, setSafetyFactor] = useState("1.25");
  const [valveCountOption, setValveCountOption] = useState("6 Values");
  const [actualSF, setActualSF] = useState(Array(6).fill(""));
  const [formData, setFormData] = useState({
    operatingPressure: "",
    actuatorYokeType: "Symmetric",
    actuatorType: "Spring Return",
    failSafeValue: "Fail Close (Fail Clockwise - FCW)",
    endCloseValue: "",
    actuatorName: "",
    pnuematicStart: "",
    pnuematicEnd: "",
    pnuematicMid: "",
    springStart: "",
    springMid: "",
    springEnd: "",
    springNumber: "",
  });

  const { user } = useContext(AuthContext);
  console.log(user, "useeeeerr");

  const supplyPressureOptions = [
    "3.0",
    "3.5",
    "4.0",
    "4.5",
    "5.0",
    "5.5",
    "6.0",
    "7.0",
    "8.0",
    "10.0",
  ];

const getConfigurationData = () => {
  // Determine action based on actuator type and fail safe condition
  let action = "";
  if (formData.actuatorType.includes("Spring Return")) {
    if (formData.failSafeValue.includes("Fail Close")) {
      action = "SpringReturn, FailCW";
    } else {
      action = "SpringReturn, FailCCW";
    }
  } else if (formData.actuatorType.includes("Double Acting")) {
    if (formData.failSafeValue.includes("Single Cylinder")) {
      action = "Double Acting, Single Cylinder";
    } else {
      action = "Double Acting, Dual Cylinder";
    }
  }

  // Format mounting yoke with ISO prefix
  const mountingYoke = `ISO / ${formData.actuatorYokeType}`;

  return {
    series: selectedSeries,
    supplyPressure: parseFloat(formData.operatingPressure) || null,
    valveInfo: {
      valveType: valveType,
      requiredSafetyFactor: parseFloat(safetyFactor) || null,
      stemDiameter: {
        value: parseFloat(stemDiameter) || null,
        inch: stemUnit === "Inch",
        metric: stemUnit === "Metric",
      },
      brand: "",
      valveSize: "",
      seriesModel: "",
      additionalInfo: "",
      differentialPressure: "",
      mastValue: "",
      stemMaterial: "",
      mountingKit: "",
      mountingFlange: "",
      vmc: "",
    },
    valveTorques: {
      breakToOpen: parseFloat(torques[0]) || null,
      runToOpen: parseFloat(torques[1]) || null,
      endToOpen: parseFloat(torques[2]) || null,
      breakToClose:
        valveCountOption === "6 Values"
          ? parseFloat(torques[3]) || null
          : null,
      runToClose:
        valveCountOption === "6 Values"
          ? parseFloat(torques[4]) || null
          : null,
      endToClose:
        valveCountOption === "6 Values"
          ? parseFloat(torques[5]) || null
          : null,
    },
    actuatorTorques: {
      pneumaticStart: parseFloat(formData.pnuematicStart) || null,
      pneumaticMin: parseFloat(formData.pnuematicMid) || null,
      pneumaticEnd: parseFloat(formData.pnuematicEnd) || null,
      springStart: parseFloat(formData.springStart) || null,
      springMin: parseFloat(formData.springMid) || null,
      springEnd: parseFloat(formData.springEnd) || null,
    },
    actualSF: {
      pneumaticStart: parseFloat(actualSF[0]) || null,
      pneumaticMin: parseFloat(actualSF[1]) || null,
      pneumaticEnd: parseFloat(actualSF[2]) || null,
      springStart: parseFloat(actualSF[3]) || null,
      springMin: parseFloat(actualSF[4]) || null,
      springEnd: parseFloat(actualSF[5]) || null,
    },
    userId: `${user}`,
    actuatorSize: formData.actuatorName || "",
    boreSize: "3",
    cylinderSize: "14",
    mop: parseFloat(formData.operatingPressure) || null,
    springSize: formData.springNumber || "",
    baseCode: "",
    action: action,
    mountingYoke: mountingYoke,
    ports: "",
    orientation: "",
    kitSealRepair: "",
    partNumber: "",
  };
};

  // Fetch data effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [valveRes, seriesRes] = await Promise.all([
          fetch(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_VALVE_DATA}`
          ),
          fetch(
            `${import.meta.env.VITE_BASE_URL}${
              import.meta.env.VITE_VALVE_SERIES
            }`
          ),
        ]);

        const valveData = await valveRes.json();
        const seriesData = await seriesRes.json();
        console.log(seriesData, "Series data");
        setValveData(valveData.data || []);
        setActuatorSeries(
          seriesData.data ? seriesData.data.map((s) => s.name) : []
        );
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  // Set default series
  useEffect(() => {
    if (actuatorSeries.length > 0) {
      const s98Series = actuatorSeries.find((s) => s.includes("S98"));
      setSelectedSeries(s98Series || actuatorSeries[0]);
    }
  }, [actuatorSeries]);

  // Update actual safety factor
  useEffect(() => {
    const actuatorValues = [
      formData.pnuematicStart,
      formData.pnuematicMid,
      formData.pnuematicEnd,
      formData.springStart,
      formData.springMid,
      formData.springEnd,
    ];

    const newActualSF = actuatorValues.map((actuatorVal, i) => {
      const valveVal = parseFloat(torques[i]);
      const actuator = parseFloat(actuatorVal);
      return !isNaN(valveVal) && valveVal !== 0 && !isNaN(actuator)
        ? (actuator / valveVal).toFixed(2)
        : "";
    });

    setActualSF(newActualSF);
  }, [torques, formData]);

  console.log(actualSF, "atualsf");

  // Update end close value
  useEffect(() => {
    setFormData((prev) => ({ ...prev, endCloseValue: torques[5] || "" }));
  }, [torques]);

  // Event handlers
  const handleValveTypeChange = (e) => {
    setValveType(e.target.value);
    setTorques(Array(6).fill(""));
  };

  const handleTorqueChange = (idx, e) => {
    let value = e.target.value;
    let newTorques = [...torques];

    if (value !== "") value = Math.round(parseFloat(value));
    newTorques[idx] = value;

    if (idx === 0 && value !== "") {
      const num = parseFloat(value) || 0;
      if (valveType.toLowerCase() === "ball") {
        newTorques = [
          Math.round(num),
          Math.round(num * 0.75),
          Math.round(num * 0.8),
          Math.round(num * 0.8),
          Math.round(num * 0.75),
          Math.round(num * 0.9),
        ];
      } else if (valveType.toLowerCase() === "butterfly") {
        newTorques = [
          Math.round(num),
          Math.round(num * 0.3),
          Math.round(num * 0.3),
          Math.round(num * 0.3),
          Math.round(num * 0.3),
          Math.round(num),
        ];
      }
    }
    setTorques(newTorques);
  };

  const handleActuatorTypeChange = (option) => {
    setFormData((prev) => ({
      ...prev,
      actuatorType: option,
      failSafeValue:
        option === "Spring Return"
          ? "Fail Close (Fail Clockwise - FCW)"
          : "Single Cylinder",
    }));
  };

  const handleValveCountChange = (e) => {
    setValveCountOption(e.target.value);
    const count = e.target.value === "3 Values" ? 3 : 6;
    setTorques(Array(count).fill(""));
    setActualSF(Array(count).fill(""));
  };

  const handleClearAll = () => {
    setValveType("");
    setTorques(
      valveCountOption === "6 Values" ? Array(6).fill("") : Array(3).fill("")
    );
    setFormData((prev) => ({
      ...prev,
      actuatorName: "",
      pnuematicStart: "",
      pnuematicMid: "",
      pnuematicEnd: "",
      springStart: "",
      springMid: "",
      springEnd: "",
      springNumber: "",
      operatingPressure: "",
    }));
    setPedOption("Non PED");
    setStemUnit("Metric");
    setStemDiameter("");
    setSafetyFactor("1.25");
    setActualSF(Array(6).fill(""));
    setShowButtons(false);
  };

  const handleSelectActuator = async () => {
    if (
      !formData.operatingPressure ||
      !formData.actuatorType ||
      !formData.endCloseValue ||
      !formData.actuatorYokeType
    ) {
      alert("Please fill all required fields");
      return;
    }

    const adjustedEndToClose = Math.ceil(
      parseFloat(formData.endCloseValue) * parseFloat(safetyFactor)
    );
    const requestData = {
      actuatorType: formData.actuatorType.includes("Spring Return")
        ? "Spring"
        : "Double",
      actuatorYokeType: formData.actuatorYokeType,
      operatingPressure: parseFloat(formData.operatingPressure),
      failSafeValue: formData.failSafeValue.includes("Fail Close")
        ? "FailClose"
        : "FailOpen",
      endCloseValue: adjustedEndToClose,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_FETCH_CALC}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log(data, "data");
      setFormData((prev) => ({
        ...prev,
        actuatorName: data.actuatorName ?? prev.actuatorName,
        pnuematicStart: data.pnuematicStart ?? prev.pneumaticStart,
        pnuematicMid: data.pnuematicMid ?? prev.pneumaticMid,
        pnuematicEnd: data.pnuematicEnd ?? prev.pneumaticEnd,
        springStart: data.springStart ?? prev.springStart,
        springMid: data.springMid ?? prev.springMid,
        springEnd: data.springEnd ?? prev.springEnd,
        springNumber: data.springNumber ?? prev.springNumber,
      }));
    } catch (error) {
      console.error("Error during actuator selection:", error);
    }
  };

  const handleActuatorConfigurationClick = async () => {
    const configData = getConfigurationData();
    console.log("Sending data:", configData);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ACTUATOR_CONFIG}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error saving configuration:", error);
    }

    if (setActiveTab) setActiveTab("S98 Part#");
  };

  // Constants
  const valveTypeOptions = Array.from(
    new Set(valveData.map((item) => item.name).filter(Boolean))
  );
  const torqueLabels =
    valveCountOption === "6 Values"
      ? [
          "Break to Open",
          "Run to Open",
          "End to Open",
          "Break to Close",
          "Run to Close",
          "End to Close",
        ]
      : ["Break to Open", "Run to Open", "End to Open"];

  const actuatorValues = [
    formData.pnuematicStart,
    formData.pnuematicMid,
    formData.pnuematicEnd,
    formData.springStart,
    formData.springMid,
    formData.springEnd,
  ];

  const actuatorTorquesLabels = [
    "Pneumatic Start",
    "Pneumatic Min",
    "Pneumatic End",
    "Spring Start",
    "Spring Min",
    "Spring End",
  ];

  return (
    <div className="actuator-sizing-container">
      {/* Top Section */}
      <div className="top-section">
        {/* Valve Information */}
        <div className="valve-info-section">
          <div className="section-header">
            <p className="section-title">Actuator Sizing Units</p>
            <button className="clear-button" onClick={handleClearAll}>
              Clear All
            </button>
          </div>

          <div className="valve-info-content">
            {/* Valve Type */}
            <div className="valve-type-row">
              <span className="label">Valve Type:</span>
              <select
                className="valve-type-select"
                value={valveType}
                onChange={handleValveTypeChange}
              >
                <option value="">Select Valve Type</option>
                {valveTypeOptions.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Safety Factor */}
            <div className="safety-factor-row">
              <span className="label">Required Safety Factor:</span>
              <input
                type="text"
                className="safety-factor-input"
                value={safetyFactor}
                onChange={(e) => setSafetyFactor(e.target.value)}
              />
            </div>

            {/* Stem Diameter */}
            <div className="stem-diameter-section">
              <span className="stem-diameter-title">Stem Diameter:</span>
              <div className="stem-diameter-row">
                <div className="stem-unit-options">
                  {["Inch", "Metric"].map((unit) => (
                    <label key={unit} className="stem-unit-label">
                      <input
                        type="radio"
                        name="stemUnit"
                        value={unit}
                        checked={stemUnit === unit}
                        onChange={(e) => setStemUnit(e.target.value)}
                      />
                      <span className="stem-unit-text">{unit}</span>
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  className="stem-diameter-input"
                  value={stemDiameter}
                  onChange={(e) => setStemDiameter(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Torque Section */}
        <div className="torque-section">
          <div className="torque-grid">
            <div className="torque-column">
              <div className="torque-header">
                <label className="torque-label">Value Torques</label>
                <select
                  className="valve-count-select"
                  value={valveCountOption}
                  onChange={handleValveCountChange}
                >
                  <option value="6 Values">6 Values</option>
                  <option value="3 Values">3 Values</option>
                </select>
              </div>
              {torqueLabels.map((label, i) => (
                <InputField
                  key={i}
                  label={label}
                  unit="Nm"
                  value={torques[i] || ""}
                  onChange={(e) => handleTorqueChange(i, e)}
                  disabled={!valveType}
                />
              ))}
            </div>

            <div className="torque-column">
              <div className="torque-column-title">Actuator Torques</div>
              {actuatorTorquesLabels
                .slice(0, torqueLabels.length)
                .map((label, i) => (
                  <InputField
                    key={i}
                    label={label}
                    unit="Nm"
                    value={actuatorValues[i] || ""}
                    disabled
                  />
                ))}
            </div>

            <div className="torque-column">
              <div className="torque-column-title">Actual S.F</div>
              {torqueLabels.map((_, i) => (
                <div key={i} className="sf-input-container">
                  <input
                    type="text"
                    className="sf-input"
                    value={actualSF[i] || ""}
                    onChange={(e) => {
                      const newSF = [...actualSF];
                      newSF[i] = e.target.value;
                      setActualSF(newSF);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Actuator Image Placeholder */}
        <div className="image-placeholder-section">
          <div className="image-placeholder-content">
            <div className="placeholder-image">
              <span className="placeholder-text">Actuator Image</span>
            </div>
            <p className="placeholder-description">Image placeholder</p>
          </div>
        </div>

        {/* Actuator Selector */}
        <div className="actuator-selector-section">
          <div className="actuator-selector-grid">
            {/* Actuator Series */}
            <div className="actuator-series-column">
              <label className="actuator-series-label">Actuator Series:</label>
              <div className="actuator-series-options">
                {actuatorSeries.map((series, i) => (
                  <label key={i} className="series-option">
                    <input
                      type="radio"
                      name="series"
                      checked={selectedSeries === series}
                      onChange={() => setSelectedSeries(series)}
                      disabled={
                        !series.includes("S98 - Pneumatic Scotch Yoke Actuator")
                      }
                    />
                    <span
                      className={
                        series.includes("S98 - Pneumatic Scotch Yoke Actuator")
                          ? "series-enabled"
                          : "series-disabled"
                      }
                    >
                      {series}
                    </span>
                  </label>
                ))}
              </div>

              {/* Supply Pressure */}
              <div className="supply-pressure-section">
                <label className="supply-pressure-label">
                  Supply Pressure:
                </label>
                <div className="supply-pressure-row">
                  <select
                    className="supply-pressure-select"
                    value={formData.operatingPressure}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        operatingPressure: e.target.value,
                      }))
                    }
                  >
                    <option value="">SELECT</option>
                    {supplyPressureOptions.map((pressure, idx) => (
                      <option key={idx} value={pressure}>
                        {pressure}
                      </option>
                    ))}
                  </select>
                  <span>bar</span>
                </div>
              </div>
            </div>

            {/* Actuator Type & Settings */}
            <div className="actuator-type-column">
              <label className="actuator-type-label">Actuator Type:</label>
              <RadioGroup
                name="actuatorType"
                options={[
                  { label: "Spring Return", value: "Spring Return" },
                  {
                    label: "Double Acting",
                    value: "Double Acting",
                    disabled: true,
                  },
                ]}
                value={formData.actuatorType}
                onChange={handleActuatorTypeChange}
              />

              {/* Yoke Type */}
              <div className="yoke-type-section">
                <div className="yoke-type-title">Yoke Type:</div>
                <div className="yoke-type-options">
                  {["Preferred", "Symmetric", "Canted"].map((type) => (
                    <label key={type} className="yoke-type-option">
                      <input
                        type="radio"
                        name="yokeType"
                        value={type}
                        checked={formData.actuatorYokeType === type}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            actuatorYokeType: e.target.value,
                          }))
                        }
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* PED Option */}
              <div className="ped-option-section">
                <span className="ped-option-title">PED Option:</span>
                <div className="ped-option-options">
                  {["Non PED", "PED"].map((option) => (
                    <label key={option} className="ped-option-option">
                      <input
                        type="radio"
                        name="ped"
                        value={option}
                        checked={pedOption === option}
                        onChange={(e) => setPedOption(e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Fail Safe */}
            <div className="fail-safe-column">
              <label className="fail-safe-label">Fail Safe Condition</label>
              <RadioGroup
                name="failSafe"
                options={[
                  {
                    label: "Fail Close (Fail Clockwise - FCW)",
                    value: "Fail Close (Fail Clockwise - FCW)",
                  },
                  {
                    label: "Fail Open (Fail Counter Clockwise - FCCW)",
                    value: "Fail Open (Fail Counter Clockwise - FCCW)",
                    disabled: true,
                  },
                ]}
                value={formData.failSafeValue}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, failSafeValue: value }))
                }
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons-section">
            <div className="action-buttons">
              <button
                className="select-actuator-button"
                onClick={() => {
                  setShowButtons(true);
                  handleSelectActuator();
                }}
              >
                Select Actuator
              </button>
              {showButtons && (
                <button
                  className="configuration-button"
                  onClick={handleActuatorConfigurationClick}
                >
                  Actuator Configuration
                </button>
              )}
            </div>

            <div className="actuator-selected-section1">
              <span className="actuator-selected-label">Actuator Selected</span>
              <div className="actuator-selected-section">
                <input
                  type="text"
                  className="actuator-selected-input"
                  placeholder="Actuator Model"
                  value={formData.actuatorName || ""}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
