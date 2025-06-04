import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useHealthCheck } from "./Components/HealthCheck";
import Loading from "./Components/Loading";
import ErrorScreen from "./Components/ErrorScreen";
import ErrorBoundary from "./Components/ErrorBoundary";
import "./App.css"; 
import LoginForm from "./Components/Login";
import HomePage from "./Components/HomePage";
import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import JournalListPage from "./pages/JournalList";
import JournalDetail from "./pages/JournalDetail";
import JournalForm from "./pages/JournalForm";
import Dashboard from "./pages/Dashboard";

function App() {
  const status = useHealthCheck();
  const [appState, setAppState] = useState("checking");
  const didTriggerLogin = useRef(false); // this ensures timeout is only called once

  useEffect(() => {
    if (status === "ok" && !didTriggerLogin.current) {
      didTriggerLogin.current = true;
      setTimeout(() => setAppState("login"), 2000);
    } else if (status === "error") {
      setAppState("error");
    }
  }, [status]);

  switch (appState) {
    case "checking":
      return <Loading />;
    case "login":
      return (
        <ErrorBoundary>
          <Router>
            <AuthProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LoginForm />} />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<Layout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/journals" element={<JournalListPage />} />
                    <Route path="/journals/:id" element={<JournalDetail />} />
                    <Route path="/journals/new" element={<JournalForm />} />
                    <Route path="/journals/edit/:id" element={<JournalForm />} />
                  </Route>
                </Route>
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </AuthProvider>
          </Router>
        </ErrorBoundary>
      );
    case "error":
      return <ErrorScreen />;
    default:
      return <ErrorScreen />;
  }
}

export default App;
