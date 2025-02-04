const Department = require("../models/Department");
const User = require("../models/User");

// Create a new department
exports.createDepartment = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if department already exists
        const existingDepartment = await Department.findOne({ name });
        if (existingDepartment) {
            return res.status(400).json({ message: "Department already exists" });
        }

        const department = new Department({ name });
        await department.save();

        res.status(201).json({ message: "Department created successfully", department });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Get all departments
exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Assign HOD to a department
exports.assignHOD = async (req, res) => {
    try {
        const { id } = req.params;
        const { hodId } = req.body;

        // Check if user exists
        const user = await User.findById(hodId);
        if (!user || user.role !== "faculty") {
            return res.status(400).json({ message: "Invalid faculty ID" });
        }

        // Assign HOD to department
        const department = await Department.findByIdAndUpdate(id, { hod: hodId }, { new: true });
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        res.status(200).json({ message: "HOD assigned successfully", department });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
