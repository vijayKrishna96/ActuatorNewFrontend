import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home.jsx";
import PartDecode from "../pages/PartDecode.jsx";
import S54sensor from "../pages/S54sensor.jsx";
import S5Xmonitor from "../pages/S5Xmonitor.jsx";
import ActuatorSizing from "../pages/ActuatorSizing.jsx";

import DataSheet from "../pages/DataSheet.jsx";
import ValveConfigInterface from "../pages/ActuatorConfiguration.jsx";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Actuator Sizing");

  // Example dashboard data, replace this with the real data you want to pass
  const dashboardData = {
    example: "This is dashboard data",
    // ...other data
  };

  const renderView = () => {
    switch (activeTab) {
      case "Home":
        return <Home />;
      case "Actuator Sizing":
        // Pass setActiveTab and dashboardData as props
        return (
          <ActuatorSizing
            setActiveTab={setActiveTab}
            dashboardData={dashboardData}
          />
        );
      case "S98 Part#":
        return <ValveConfigInterface />;
      case "Part# Decode":
        return <PartDecode />;
      case "SS4 Sensor":
        return <S54sensor />;
      case "SSX Monitor":
        return <S5Xmonitor />;
      case "Data Sheet":
        return <DataSheet />;
      default:
        return <ActuatorSizing />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <header className="shadow-sm AdminHeader">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold">{activeTab}</h1>
          </div>
        </header>
        <main className="p-8">{renderView()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
