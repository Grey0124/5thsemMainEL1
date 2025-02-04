const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["student", "faculty", "admin"], 
      required: true 
    },
    department: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Department" // Reference to Department model 
    },
    section: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Section", 
      required: function() { return this.role === "student"; } // Only required for students
    },
    assignedSections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
      }
    ], // Faculty can have multiple assigned sections
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
