const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const serviceRequestRoutes = require("./routes/serviceRequestRoutes");
const billingRoutes = require("./routes/billingRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/service-requests", serviceRequestRoutes);
app.use("/api/billing", billingRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Service Center Management System Backend Running Successfully"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});