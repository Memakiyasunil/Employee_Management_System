import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Employee Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Salary</h2>
          <h1 className="text-3xl font-bold mt-2">
            ₹45,000
          </h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Leave Balance</h2>
          <h1 className="text-3xl font-bold mt-2">
            12
          </h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Tasks</h2>
          <h1 className="text-3xl font-bold mt-2">
            08
          </h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Attendance</h2>
          <h1 className="text-3xl font-bold mt-2">
            96%
          </h1>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;