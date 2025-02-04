const express = require("express");
const { createDepartment, getDepartments, assignHOD } = require("../controllers/departmentController");
const router = express.Router();

router.post("/create", createDepartment); // Create a new department
router.get("/", getDepartments); // Get all departments
router.put("/:id/assign-hod", assignHOD); // Assign HOD to a department

module.exports = router;
