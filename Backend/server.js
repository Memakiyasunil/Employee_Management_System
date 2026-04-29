const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
const cors = require("cors");
require("dotenv").config();
const Employee = require("./models/Employee");


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

// start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});