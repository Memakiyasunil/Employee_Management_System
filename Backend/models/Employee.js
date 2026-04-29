const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    salary: { type: Number, required: true, min: 0 },
    dob: { type: Date, required: true },
    aadhaar: { type: String, required: true, trim: true, unique: true },
    phone: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
