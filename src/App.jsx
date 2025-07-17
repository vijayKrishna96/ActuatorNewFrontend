import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Mainlayout from "./layout/Mainlayout";
import Dashboard from "./layout/Dashboard";
import { Ruler } from "lucide-react";

import { useContext } from "react";
import {AuthContext} from "./config/AuthContext";
import Login from "./components/Login";
import ActuatorConfiguration from "./pages/ActuatorConfiguration";
import Configuration from "./pages/ActuatorConfiguration";

function App() {
  

 const { token } = useContext(AuthContext);

  

  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        {token ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        
      </Route>
              

    </Routes>
  );
}

export default App;
