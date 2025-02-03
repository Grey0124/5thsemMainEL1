const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.get('/', (req, res) => {
    res.send('RVCE Buddy Backend is Running');
});

module.exports = app;
