import React, { useEffect, useState } from "react";
import "../styles/actuatorConfig.css";
import axios from "axios";

const ValveConfigInterface = () => {
  const [configData, setConfigData] = useState({
    // Initialize with default values to prevent undefined errors
    series: "",
    actuatorSize: "",
    boreSize: "",
    cylinderSize: "",
    springSize: "",
    baseCode: "",
    action: "",
    mountingYoke: "",
    ports: "",
    standardOptions: "",
    designCode: "",
    material: "",
    tempTrim: "",
    coatings: "",
    orientation: "",
    brandMake: "",
    valveType: "",
    valveSize: "",
    valveSeriesModel: "",
    supplyPressure: "",
    breakToOpen: "",
    pneumaticStart: "",
    actualSF1: "",
    runtoOpen: "",
    pneumaticMin: "",
    actualSF2: "",
    endtoOpen: "",
    pneumaticEnd: "",
    actualSF3: "",
    breakToClose: "",
    springStart: "",
    actualSF4: "",
    runToClose: "",
    springMin: "",
    actualSF5: "",
    endToClose: "",
    springEnd: "",
    actualSF6: "",
    additionalInfo: "",
    differentialPressure: "",
    mastValue: "",
    additionalInfo2: "",
    requiredSafetyFactor: "",
    stemDiameterUnit: "inch",
    stemDiameterValue: "",
    mountingFlange: "",
    mountingKit: "",
    vmc: "",
    valveTorques: "",
    kit: false,
    seal: false,
    repair: false,
  });

  const [dropdownOptions, setDropdownOptions] = useState({
    cylinderSizes: [],
    springSizes: [],
    actions: [],
    mountingYokes: [],
    ports: [],
    standardOptions: [],
    designCodes: [],
    materials: [],
    tempTrims: [],
    coatings: [],
    valveTypes: [],
  });

  const populateStateFromAPI = (apiData) => {
    setConfigData((prevState) => ({
      ...prevState,
      // Left panel fields
      series: apiData.series ? apiData.series.split("-")[0].trim() : "",
      actuatorSize: apiData.actuatorSize
        ? apiData.actuatorSize.slice(0, 4)
        : "",
      boreSize: apiData.boreSize || "",
      cylinderSize: apiData.cylinderSize || "",
      springSize: apiData.springSize || "",
      baseCode: apiData.baseCode || "",
      action: apiData.action || "",
      mountingYoke: apiData.mountingYoke || "",
      ports: apiData.ports || "",
      standardOptions: Array.isArray(apiData.standardOptions)
        ? apiData.standardOptions[0]
        : "",
      designCode: Array.isArray(apiData.designCode)
        ? apiData.designCode[0]
        : "",
      material: Array.isArray(apiData.material) ? apiData.material[0] : "",
      tempTrim: Array.isArray(apiData.tempTrim) ? apiData.tempTrim[0] : "",
      coatings: Array.isArray(apiData.coatings) ? apiData.coatings[0] : "",
      orientation: apiData.orientation || "",

      // Right panel fields
      brandMake: apiData.valveInfo?.brand || "",
      valveType: apiData.valveInfo?.valveType || "",
      valveSize: apiData.valveInfo?.valveSize || "",
      valveSeriesModel: apiData.valveInfo?.seriesModel || "",
      supplyPressure: apiData.supplyPressure?.toString() || "",
      requiredSafetyFactor: apiData.valveInfo?.requiredSafetyFactor?.toString() || "",

      // Torque fields
      breakToOpen: apiData.valveTorques?.breakToOpen?.toString() || "",
      pneumaticStart: apiData.actuatorTorques?.pneumaticStart?.toString() || "",
      actualSF1: apiData.actualSF?.pneumaticStart?.toString() || "",
      runtoOpen: apiData.valveTorques?.runToOpen?.toString() || "",
      pneumaticMin: apiData.actuatorTorques?.pneumaticMin?.toString() || "",
      actualSF2: apiData.actualSF?.pneumaticMin?.toString() || "",
      endtoOpen: apiData.valveTorques?.endToOpen?.toString() || "",
      pneumaticEnd: apiData.actuatorTorques?.pneumaticEnd?.toString() || "",
      actualSF3: apiData.actualSF?.pneumaticEnd?.toString() || "",
      breakToClose: apiData.valveTorques?.breakToClose?.toString() || "",
      springStart: apiData.actuatorTorques?.springStart?.toString() || "",
      actualSF4: apiData.actualSF?.springStart?.toString() || "",
      runToClose: apiData.valveTorques?.runToClose?.toString() || "",
      springMin: apiData.actuatorTorques?.springMin?.toString() || "",
      actualSF5: apiData.actualSF?.springMin?.toString() || "",
      endToClose: apiData.valveTorques?.endToClose?.toString() || "",
      springEnd: apiData.actuatorTorques?.springEnd?.toString() || "",
      actualSF6: apiData.actualSF?.springEnd?.toString() || "",
    }));

    // Update dropdown options with API data
    setDropdownOptions((prevOptions) => ({
      ...prevOptions,
      standardOptions: Array.isArray(apiData.standardOptions)
        ? apiData.standardOptions
        : prevOptions.standardOptions,
      designCodes: Array.isArray(apiData.designCode)
        ? apiData.designCode
        : prevOptions.designCodes,
      materials: Array.isArray(apiData.material)
        ? apiData.material
        : prevOptions.materials,
      tempTrims: Array.isArray(apiData.tempTrim)
        ? apiData.tempTrim
        : prevOptions.tempTrims,
      coatings: Array.isArray(apiData.coatings)
        ? apiData.coatings
        : prevOptions.coatings,
    }));
  };

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ACTUATOR_CONFIG}`);
        console.log("API Response:", response.data);

        // Check if response has data
        if (response.data && response.data.length > 0) {
          // Get the last item in the array
          const data = response.data[response.data.length - 1];
          console.log("Selected data:", data);

          // Call the function to populate state with API data
          populateStateFromAPI(data);
        } else {
          console.log("No data received from API");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setConfigData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Generate part number based on selections
  const generatePartNumber = () => {
    return `98F1K1-213C1*N000S0`; // This should be replaced with your actual logic
  };

  return (
    <div className="container">
      {/* Left panel */}
      <div className="pannel">
        <div className="input-group">
          <label className="input-label">Series</label>
          <input
            className="input-field-level1"
            type="text"
            name="series"
            value={configData.series}
            readOnly
          />
        </div>
        <div className="input-group">
          <label className="input-label">Actuator Size</label>
          <input
            className="input-field-level1"
            type="text"
            name="actuatorSize"
            value={configData.actuatorSize}
            readOnly
          />
          <span>F</span>
        </div>
        <div className="input-group">
          <label className="input-label">Bore Size</label>
          <input
            className="input-field-level1"
            type="text"
            name="boreSize"
            value={configData.boreSize}
            readOnly
          />
          <span>1</span>
        </div>
        <div className="input-group">
          <label className="input-label">Cylinder Size</label>
          <select
            disabled
            className="dropdown"
            name="cylinderSize"
            value={configData.cylinderSize}
          >
            <option value="">{configData.cylinderSize}</option>
            {dropdownOptions.cylinderSizes?.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>K</span>
          <label className="mop-label">MOP</label>
          <input
            className="input-field small"
            type="text"
            value="10"
            readOnly
          />
          <label>bar</label>
        </div>
        <div className="input-group">
          <label className="input-label">Spring Size</label>
          <select
            disabled
            className="dropdown-level2"
            name="springSize"
            value={configData.springSize}
          >
            <option value="">Spring {configData.springSize}</option>
            {dropdownOptions.springSizes?.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>1</span>
        </div>
        <div className="input-group">
          <label className="input-label">Base Code</label>
          <input
            className="input-field-level1"
            type="text"
            name="baseCode"
            value={configData.baseCode}
            readOnly
          />
        </div>
        <div className="input-group">
          <label className="input-label">Action</label>
          <select
            disabled
            className="dropdown-level2"
            name="action"
            value={configData.action}
          >
            <option value="">{configData.action}</option>
            {dropdownOptions.actions?.map((action, index) => (
              <option key={index} value={action}>
                {action}
              </option>
            ))}
          </select>
          <span>C</span>
        </div>
        <div className="input-group">
          <label className="input-label">Mounting/Yoke</label>
          <select
            className="dropdown-level2"
            name="mountingYoke"
            value={configData.mountingYoke}
            disabled
          >
            <option value={configData.mountingYoke}>
              {configData.mountingYoke}
            </option>
            {dropdownOptions.mountingYokes?.map((yoke, index) => (
              <option key={index} value={yoke}>
                {yoke}
              </option>
            ))}
          </select>
          <span>1</span>
          <input className="input-field small" type="text" value="" readOnly />
        </div>
        <div className="input-group">
          <label className="input-label">Ports</label>
          <select
            className="dropdown-level2"
            name="ports"
            value={configData.ports}
            disabled
          >
            <option value=""></option>
            {dropdownOptions.ports?.map((port, index) => (
              <option key={index} value={port}>
                {port}
              </option>
            ))}
          </select>
          <span>*</span>
          <input className="input-field small" type="text" value="" readOnly />
        </div>
        <div className="input-group">
          <label className="input-label">Standard Options</label>
          <select
            className="dropdown-level3"
            name="standardOptions"
            value={configData.standardOptions}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            {dropdownOptions.standardOptions?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span>N</span>
        </div>
        <div className="input-group">
          <label className="input-label">Design Code</label>
          <select
            className="dropdown-level3"
            name="designCode"
            value={configData.designCode}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            {dropdownOptions.designCodes?.map((code, index) => (
              <option key={index} value={code}>
                {code}
              </option>
            ))}
          </select>
          <span>00</span>
        </div>
        <div className="input-group">
          <label className="input-label">Material</label>
          <select
            className="dropdown-level3"
            name="material"
            value={configData.material}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            {dropdownOptions.materials?.map((material, index) => (
              <option key={index} value={material}>
                {material}
              </option>
            ))}
          </select>
          <span>0</span>
        </div>
        <div className="input-group">
          <label className="input-label">Temp Trim</label>
          <select
            className="dropdown-level3"
            name="tempTrim"
            value={configData.tempTrim}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            {dropdownOptions.tempTrims?.map((trim, index) => (
              <option key={index} value={trim}>
                {trim}
              </option>
            ))}
          </select>
          <span>S</span>
        </div>
        <div className="input-group">
          <label className="input-label">Coatings</label>
          <select
            className="dropdown-level3"
            name="coatings"
            value={configData.coatings}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            {dropdownOptions.coatings?.map((coating, index) => (
              <option key={index} value={coating}>
                {coating}
              </option>
            ))}
          </select>
          <span>0</span>
        </div>
        <div className="input-group">
          <label className="input-label">Orientation</label>
          <input
            className="input-field"
            type="text"
            name="orientation"
            value={configData.orientation}
            onChange={handleInputChange}
            readOnly
          />
          <button className="button" type="button">
            Orientation
          </button>
        </div>
        <div className="input-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="kit"
              checked={configData.kit}
              onChange={handleInputChange}
            />{" "}
            Kit
          </label>
          <label>
            <input
              type="radio"
              name="seal"
              checked={configData.seal}
              onChange={handleInputChange}
            />{" "}
            Seal
          </label>
          <label>
            <input
              type="radio"
              name="repair"
              checked={configData.repair}
              onChange={handleInputChange}
            />{" "}
            Repair
          </label>
        </div>
        <div className="part-number">
          <label>Part Number</label>
          <div className="part-value">{generatePartNumber()}</div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="pannel">
        <h2 className="valve-info-header">Valve Information</h2>
        <div className="grid-container">
          <div className="grid-item mb-2">
            <label htmlFor="brandMake">Brand/Make</label>
            <input
              type="text"
              className="valve-input-level1 yellow-bg"
              name="brandMake"
              id="brandMake"
              value={configData.brandMake}
              onChange={handleInputChange}
            />
            <label htmlFor="valveType">Valve Type</label>
            <input
              type="text"
              className="valve-input-level1 yellow-bg"
              name="valveType"
              id="valveType"
              value={configData.valveType}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid-item mb-2">
            <label htmlFor="valveSize">Valve Size</label>
            <input
              type="text"
              className="valve-input-level1 yellow-bg"
              name="valveSize"
              id="valveSize"
              value={configData.valveSize}
              onChange={handleInputChange}
            />
            <label htmlFor="valveSeriesModel">Series/Model</label>
            <input
              type="text"
              className="valve-input-level1 yellow-bg"
              name="valveSeriesModel"
              id="valveSeriesModel"
              value={configData.valveSeriesModel}
              onChange={handleInputChange}
            />
          </div>
          <div className="info mb-2">
            <label htmlFor="additionalInfo">Additional Information</label>
            <input
              type="text"
              className="valve-input-level2 yellow-bg"
              name="additionalInfo"
              id="additionalInfo"
              value={configData.additionalInfo}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid-item mb-2">
            <label htmlFor="differentialPressure">Differential Pressure</label>
            <input
              type="text"
              className="valve-input-level1 yellow-bg"
              name="differentialPressure"
              id="differentialPressure"
              value={configData.differentialPressure}
              onChange={handleInputChange}
            />
            <label htmlFor="mastValue">MAST Value</label>
            <input
              type="text"
              className="valve-input-level1 yellow-bg"
              name="mastValue"
              id="mastValue"
              value={configData.mastValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="info mb-2">
            <label htmlFor="additionalInfo2">Additional Information</label>
            <input
              type="text"
              className="valve-input-level2 yellow-bg"
              name="additionalInfo2"
              id="additionalInfo2"
              value={configData.additionalInfo2}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid-item mb-2">
            <label htmlFor="requiredSafetyFactor">Required Safety Factor</label>
            <input
              type="text"
              className="valve-input-level1 yellow-bg"
              name="requiredSafetyFactor"
              id="requiredSafetyFactor"
              value={configData.requiredSafetyFactor}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <label className="label">Stem Diameter</label>
        <div className="grid-item mb-2">
          <div className="valve-radio-group">
            <label>
              <input
                type="radio"
                name="stemDiameterUnit"
                value="inch"
                checked={configData.stemDiameterUnit === "inch"}
                onChange={handleInputChange}
              />{" "}
              Inch
            </label>
            <label>
              <input
                type="radio"
                name="stemDiameterUnit"
                value="metric"
                checked={configData.stemDiameterUnit === "metric"}
                onChange={handleInputChange}
              />{" "}
              Metric
            </label>
          </div>
          <input
            type="text"
            className="input-field gray-bg"
            name="stemDiameterValue"
            value={configData.stemDiameterValue}
            onChange={handleInputChange}
          />

          <label>Mounting Flange</label>
          <input
            type="text"
            className="input-field gray-bg"
            name="mountingFlange"
            value={configData.mountingFlange}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid-item mb-2">
          <label htmlFor="mountingKit">Mounting Kit</label>
          <input
            type="text"
            className="input-field gray-bg"
            name="mountingKit"
            id="mountingKit"
            value={configData.mountingKit}
            onChange={handleInputChange}
          />
          <label htmlFor="vmc">VMC:</label>
          <input
            type="text"
            className="input-field gray-bg"
            name="vmc"
            id="vmc"
            value={configData.vmc}
            onChange={handleInputChange}
          />
        </div>
        <label htmlFor="important-note" className="label">
          Important Note
        </label>
        <div className="grid-item mb-2 mt-2">
          <label htmlFor="supplyPressure">Supply Pressure</label>
          <input
            type="text"
            className="input-field gray-bg"
            name="supplyPressure"
            id="supplyPressure"
            value={configData.supplyPressure}
            onChange={handleInputChange}
          />
          <label htmlFor="bar">Bar:</label>
          <span></span>
        </div>
        <div>
          <div className="grid-item2 mb-2">
            <div className="flex items-center gap-10">
              <label htmlFor="valveTorques" className="label">
                Valve&nbsp;Torques
              </label>
              <input
                type="text"
                className="valve-input gray-bg"
                name="valveTorques"
                id="valveTorques"
                value={"6"}
                onChange={handleInputChange}
              />
            </div>
            <label className="label">Actuator&nbsp;Torques</label>
            <label className="label">Actual S.F</label>
          </div>
          <div className="grid-item-valve mb-2">
            <div className="flex items-center gap-2">
              <label htmlFor="breakToOpen">Break to open</label>
              <input
                type="text"
                className="valve-input gray-bg"
                name="breakToOpen"
                id="breakToOpen"
                value={configData.breakToOpen}
                onChange={handleInputChange}
              />
              <span>Nm</span>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="pneumaticStart">Pneumatic Start</label>
              <input
                type="text"
                className="valve-input gray-bg"
                name="pneumaticStart"
                id="pneumaticStart"
                value={configData.pneumaticStart}
                onChange={handleInputChange}
              />
              <span>Nm</span>
            </div>
            <input
              type="text"
              className="valve-input gray-bg"
              name="actualSF1"
              value={configData.actualSF1}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid-item-valve mb-2">
            <div className="flex items-center gap-2">
              <label htmlFor="runtoOpen">Run to open</label>
              <input
                type="text"
                className="valve-input gray-bg"
                name="runtoOpen"
                id="runtoOpen"
                value={configData.runtoOpen}
                onChange={handleInputChange}
              />
              <span>Nm</span>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="pneumaticMin">Pneumatic Min</label>
              <input
                type="text"
                className="valve-input gray-bg"
                name="pneumaticMin"
                id="pneumaticMin"
                value={configData.pneumaticMin}
                onChange={handleInputChange}
              />
              <span>Nm</span>
            </div>
            <input
              type="text"
              className="valve-input gray-bg"
              name="actualSF2"
              value={configData.actualSF2}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid-item-valve mb-2">
            <div className="flex items-center gap-2">
              <label htmlFor="endtoOpen">End to open</label>
              <input
                type="text"
                className="valve-input gray-bg"
                name="endtoOpen"
                id="endtoOpen"
                value={configData.endtoOpen}
                onChange={handleInputChange}
              />
              <span>Nm</span>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="pneumaticEnd">Pneumatic End</label>
              <input
                type="text"
                className="valve-input gray-bg"
                name="pneumaticEnd"
                id="pneumaticEnd"
                value={configData.pneumaticEnd}
                onChange={handleInputChange}
              />
              <span>Nm</span>
            </div>
            <input
              type="text"
              className="valve-input gray-bg"
              name="actualSF3"
              value={configData.actualSF3}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid-item-valve mb-2">
            <div className="flex items-center gap-2">
              <label htmlFor="breakToClose">Break to Close</label>
              <input
                type="text"
                className="valve-input gray-bg"
                name="breakToClose"
                id="breakToClose"
                value={configData.breakToClose}
                onChange={handleInputChange}
              />
              <span>Nm</span>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="springStart">Spring Start</label>
              <input
                type="text"
                className="valve-input gray-bg"
                name="springStart"
                id="springStart"
                value={configData.springStart}
                onChange={handleInputChange}
              />
              <span>Nm</span>
            </div>
            <input
              type="text"
              className="valve-input gray-bg"
              name="actualSF4"
              value={configData.actualSF4}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid-item-valve mb-2">
            <div className="flex items-center gap-2">
              <label htmlFor="runToClose">Run to Close</label>
              <input
                type="text"
                className="valve-input gray-bg"
                name="runToClose"
                id="runToClose"
                value={configData.runToClose}
                onChange={handleInputChange}
              />
              <span>Nm</span>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="springMin">Spring Min</label>
              <input
                type="text"
                className="valve-input gray-bg"
                name="springMin"
                id="springMin"
                value={configData.springMin}
                onChange={handleInputChange}
              />
              <span>Nm</span>
            </div>
            <input
              type="text"
              className="valve-input gray-bg"
              name="actualSF5"
              value={configData.actualSF5}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid-item-valve mb-2">
            <div className="flex items-center gap-2">
              <label htmlFor="endToClose">End to Close</label>
              <input
                type="text"
                className="valve-input gray-bg"
                name="endToClose"
                id="endToClose"
                value={configData.endToClose}
                onChange={handleInputChange}
              />
              <span>Nm</span>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="springEnd">Spring End</label>
              <input
                type="text"
                className="valve-input gray-bg"
                name="springEnd"
                id="springEnd"
                value={configData.springEnd}
                onChange={handleInputChange}
              />
              <span>Nm</span>
            </div>
            <input
              type="text"
              className="valve-input gray-bg"
              name="actualSF6"
              value={configData.actualSF6}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValveConfigInterface;
