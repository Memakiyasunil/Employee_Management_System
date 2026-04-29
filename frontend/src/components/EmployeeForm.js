import React, { useState } from "react";  // ✅ REQUIRED

const stateCityData = {
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"]
};

const EmployeeForm = () => {
  const [form, setForm] = useState({
    name: "",
    state: "",
    city: ""
  });

  const handleStateChange = (e) => {
    setForm({
      ...form,
      state: e.target.value,
      city: ""
    });
  };

  const handleCityChange = (e) => {
    setForm({ ...form, city: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">Add Employee</h2>

      <input
        type="text"
        placeholder="Name"
        className="w-full border p-2 mb-3"
      />

      {/* State */}
      <select
        value={form.state}
        onChange={handleStateChange}
        className="w-full border p-2 mb-3"
      >
        <option value="">Select State</option>
        {Object.keys(stateCityData).map((state) => (
          <option key={state}>{state}</option>
        ))}
      </select>

      {/* City */}
      <select
        value={form.city}
        onChange={handleCityChange}
        className="w-full border p-2 mb-3"
        disabled={!form.state}
      >
        <option value="">Select City</option>
        {form.state &&
          stateCityData[form.state].map((city) => (
            <option key={city}>{city}</option>
          ))}
      </select>

      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
};

export default EmployeeForm;  // ✅ VERY IMPORTANT