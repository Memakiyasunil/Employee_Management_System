const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
const cors = require("cors");
require("dotenv").config();
const Employee = require("./models/Employee");
const Attendance = require("./models/Attendance");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// change dns 
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
app.use(cors());
app.use(express.json());

// connect mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log("DB Error:", err));

// simple route
app.get("/", (req, res) => {
  res.send("Backend + MongoDB working 🚀");
});

// login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // DEMO BYPASS: Allows login even if MongoDB is not whitelisted
    if (email === "admin@example.com" && password === "password123") {
      const token = jwt.sign({ id: "dummy_admin_id", role: "Admin" }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });
      return res.json({ 
        token, 
        user: { name: "Admin User", email: "admin@example.com", role: "Admin" } 
      });
    }

    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: employee._id, role: employee.role }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });
    
    // Don't send password back
    const { password: _, ...employeeData } = employee._doc;
    res.json({ token, user: employeeData });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// create employee
app.post("/api/employees", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: "Failed to create employee", error: err.message });
  }
});

// get all employees
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch employees", error: err.message });
  }
});

// update employee
app.put("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: "Failed to update employee", error: err.message });
  }
});

// delete employee
app.delete("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete employee", error: err.message });
  }
});

// get all attendance
app.get("/api/attendance", async (req, res) => {
  try {
    const attendance = await Attendance.find().populate("employeeId", "name email role").sort({ date: -1 });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attendance", error: err.message });
  }
});

// create attendance
app.post("/api/attendance", async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ message: "Failed to record attendance", error: err.message });
  }
});

// start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});