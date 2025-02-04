const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "A", "B", "C"
    department: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Department", 
      required: true 
    },
    faculty: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" // Faculty assigned to this section
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Section", sectionSchema);
