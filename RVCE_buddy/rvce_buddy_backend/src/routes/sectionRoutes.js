const express = require("express");
const { createSection, getSections, assignFaculty } = require("../controllers/sectionController");
const router = express.Router();

router.post("/create", createSection); // Create a new section
router.get("/", getSections); // Get all sections
router.put("/:id/assign-faculty", assignFaculty); // Assign faculty to a section

module.exports = router;
