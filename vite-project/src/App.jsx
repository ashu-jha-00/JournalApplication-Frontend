import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useHealthCheck } from "./Components/HealthCheck";
import CreateUserForm from "./Components/CreateUserForm";
import Loading from "./Components/Loading";
import ErrorScreen from "./Components/ErrorScreen";
import "./App.css"; 
import LoginForm from "./Components/Login";
import HomePage from "./Components/HomePage";

function App() {
  const status = useHealthCheck();
  const [appState, setAppState] = useState("checking");
  const didTriggerLogin = useRef(false); // this ensures timeout is only called once

  useEffect(() => {
    if (status === "ok" && !didTriggerLogin.current) {
      didTriggerLogin.current = true;
      setTimeout(() => setAppState("login"), 1000);
    } else if (status === "error") {
      setAppState("error");
    }
  }, [status]);

  switch (appState) {
    case "checking":
      return <Loading />;
    case "login":
      return (
        <Router>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<LoginForm />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      );
    case "error":
      return <ErrorScreen />;
    default:
      return <ErrorScreen />;
  }
}

export default App;
