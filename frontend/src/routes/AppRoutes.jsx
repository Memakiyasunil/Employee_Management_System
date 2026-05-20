import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/employee/Dashboard";
import Leave from "../pages/employee/Leave";
import Salary from "../pages/employee/Salary";
import Tasks from "../pages/employee/Tasks";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />

        {/* Employee */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route path="/leave" element={<Leave />} />

        <Route path="/salary" element={<Salary />} />

        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;