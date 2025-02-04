const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    head: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" // HOD (Admin role) reference
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
