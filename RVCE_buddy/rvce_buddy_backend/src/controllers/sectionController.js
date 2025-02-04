const Section = require("../models/Section");
const Department = require("../models/Department");
const User = require("../models/User");

// Create a new section under a department
exports.createSection = async (req, res) => {
    try {
        const { name, departmentId } = req.body;

        // Check if department exists
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        const section = new Section({ name, department: departmentId });
        await section.save();

        res.status(201).json({ message: "Section created successfully", section });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Get all sections
exports.getSections = async (req, res) => {
    try {
        const sections = await Section.find().populate("department", "name");
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Assign faculty to a section
exports.assignFaculty = async (req, res) => {
    try {
        const { id } = req.params;
        const { facultyId } = req.body;

        // Check if user exists and is a faculty member
        const faculty = await User.findById(facultyId);
        if (!faculty || faculty.role !== "faculty") {
            return res.status(400).json({ message: "Invalid faculty ID" });
        }

        // Assign faculty to section
        const section = await Section.findByIdAndUpdate(id, { faculty: facultyId }, { new: true });
        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        res.status(200).json({ message: "Faculty assigned successfully", section });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
