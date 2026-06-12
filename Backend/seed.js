const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const Employee = require("./models/Employee");
const Attendance = require("./models/Attendance");

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    // Clear existing data
    await Employee.deleteMany({});
    await Attendance.deleteMany({});
    console.log("Cleared existing Employees and Attendance data");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    // Create dummy employees
    const employees = [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "Admin",
        salary: 100000,
        dob: new Date("1980-01-01"),
        aadhaar: "123456789012",
        phone: "9876543210",
        state: "Maharashtra",
        city: "Mumbai",
      },
      {
        name: "QA Manager",
        email: "qa@example.com",
        password: hashedPassword,
        role: "QA",
        salary: 80000,
        dob: new Date("1990-05-15"),
        aadhaar: "234567890123",
        phone: "8765432109",
        state: "Karnataka",
        city: "Bangalore",
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        role: "Employee",
        salary: 50000,
        dob: new Date("1995-08-20"),
        aadhaar: "345678901234",
        phone: "7654321098",
        state: "Delhi",
        city: "New Delhi",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
        role: "Employee",
        salary: 55000,
        dob: new Date("1996-11-10"),
        aadhaar: "456789012345",
        phone: "6543210987",
        state: "Tamil Nadu",
        city: "Chennai",
      },
    ];

    const insertedEmployees = await Employee.insertMany(employees);
    console.log(`Inserted ${insertedEmployees.length} employees`);

    // Create dummy attendance
    const attendanceRecords = [];
    const today = new Date();
    
    // For last 3 days
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      insertedEmployees.forEach((emp) => {
        // Randomly assign status
        const statuses = ["Present", "Present", "Present", "Absent", "Leave", "Half Day"];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        attendanceRecords.push({
          employeeId: emp._id,
          date: date,
          status: randomStatus,
        });
      });
    }

    await Attendance.insertMany(attendanceRecords);
    console.log(`Inserted ${attendanceRecords.length} attendance records`);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();
