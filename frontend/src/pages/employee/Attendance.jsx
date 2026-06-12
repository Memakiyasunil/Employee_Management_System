import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/attendance");
        const data = await res.json();
        setAttendance(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Attendance Records (QA View)</h1>
      <div className="bg-white p-6 rounded-2xl shadow">
        {loading ? (
          <p>Loading attendance data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-600">Employee Name</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Role</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{record.employeeId?.name || "N/A"}</td>
                    <td className="py-3 px-4 text-gray-500">{record.employeeId?.role || "N/A"}</td>
                    <td className="py-3 px-4 text-gray-500">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        record.status === "Present" ? "bg-green-100 text-green-700" :
                        record.status === "Absent" ? "bg-red-100 text-red-700" :
                        record.status === "Leave" ? "bg-yellow-100 text-yellow-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {attendance.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-gray-500">
                      No attendance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Attendance;
