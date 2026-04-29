import React, { useEffect, useState } from "react";

const stateCityData = {
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"]
};
const API_BASE_URL = "http://localhost:5000/api/employees";

const initialFormData = {
  name: "",
  role: "",
  salary: "",
  dob: "",
  aadhaar: "",
  phone: "",
  state: "",
  city: ""
};

const EmployeeForm = () => {
  const [form, setForm] = useState(initialFormData);
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error("Unable to fetch employees");
      }
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (e) => {
    setForm((prev) => ({
      ...prev,
      state: e.target.value,
      city: ""
    }));
  };

  const handleCityChange = (e) => {
    setForm((prev) => ({ ...prev, city: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      salary: Number(form.salary)
    };

    try {
      setError("");
      if (editingId) {
        const response = await fetch(`${API_BASE_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          throw new Error("Failed to update employee");
        }
      } else {
        const response = await fetch(API_BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          throw new Error("Failed to create employee");
        }
      }

      setForm(initialFormData);
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (employee) => {
    setForm({
      name: employee.name,
      role: employee.role,
      salary: employee.salary,
      dob: employee.dob ? employee.dob.split("T")[0] : "",
      aadhaar: employee.aadhaar,
      phone: employee.phone,
      state: employee.state,
      city: employee.city
    });
    setEditingId(employee._id);
    setError("");
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }
      if (editingId === id) {
        setEditingId(null);
        setForm(initialFormData);
      }
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialFormData);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Employee Management System</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Employee Name"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleInputChange}
            placeholder="Role"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleInputChange}
            placeholder="Salary"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="text"
            name="aadhaar"
            value={form.aadhaar}
            onChange={handleInputChange}
            placeholder="Aadhaar Card No"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            minLength={12}
            maxLength={12}
            required
          />

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            minLength={10}
            maxLength={10}
            required
          />

          <select
            name="state"
            value={form.state}
            onChange={handleStateChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">Select State</option>
            {Object.keys(stateCityData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            name="city"
            value={form.city}
            onChange={handleCityChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
            disabled={!form.state}
            required
          >
            <option value="">Select City</option>
            {form.state &&
              stateCityData[form.state].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {editingId ? "Update Employee" : "Add Employee"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <div className="mt-8 bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Employees Grid</h3>
        {loading ? (
          <p className="text-gray-500">Loading employees...</p>
        ) : employees.length === 0 ? (
          <p className="text-gray-500">No employee added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-green-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border">Salary</th>
                  <th className="px-4 py-2 border">DOB</th>
                  <th className="px-4 py-2 border">Aadhaar</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">State</th>
                  <th className="px-4 py-2 border">City</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id} className="text-center hover:bg-gray-50">
                    <td className="px-4 py-2 border">{employee.name}</td>
                    <td className="px-4 py-2 border">{employee.role}</td>
                    <td className="px-4 py-2 border">{employee.salary}</td>
                    <td className="px-4 py-2 border">
                      {employee.dob ? new Date(employee.dob).toLocaleDateString() : ""}
                    </td>
                    <td className="px-4 py-2 border">{employee.aadhaar}</td>
                    <td className="px-4 py-2 border">{employee.phone}</td>
                    <td className="px-4 py-2 border">{employee.state}</td>
                    <td className="px-4 py-2 border">{employee.city}</td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(employee)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(employee._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeForm;