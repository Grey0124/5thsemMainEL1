const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const departmentRoutes = require("./routes/departmentRoutes");
const sectionRoutes = require("./routes/sectionRoutes");


require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/departments", departmentRoutes);
app.use("/api/sections", sectionRoutes);


app.get('/', (req, res) => {
    res.send('RVCE Buddy Backend is Running');
});

module.exports = app;
