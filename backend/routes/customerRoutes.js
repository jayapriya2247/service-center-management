const express = require("express");
const Customer = require("../models/Customer");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// CREATE CUSTOMER
// ========================================
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name, phone, email, address, vehicleNumber, vehicleModel } = req.body;

        if (!name || !phone || !email || !address || !vehicleNumber || !vehicleModel) {
            return res.status(400).json({
                message: "All customer fields are required"
            });
        }

        const customer = await Customer.create({
            name,
            phone,
            email,
            address,
            vehicleNumber,
            vehicleModel
        });

        res.status(201).json({
            message: "Customer created successfully",
            customer
        });

    } catch (error) {
        console.error("Create Customer Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// ========================================
// GET ALL CUSTOMERS
// ========================================
router.get("/", authMiddleware, async (req, res) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });

        res.status(200).json({
            count: customers.length,
            customers
        });

    } catch (error) {
        console.error("Get Customers Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// ========================================
// GET CUSTOMER BY ID
// ========================================
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json(customer);

    } catch (error) {
        console.error("Get Customer Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// ========================================
// UPDATE CUSTOMER
// ========================================
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json({
            message: "Customer updated successfully",
            customer
        });

    } catch (error) {
        console.error("Update Customer Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// ========================================
// DELETE CUSTOMER
// ========================================
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json({
            message: "Customer deleted successfully"
        });

    } catch (error) {
        console.error("Delete Customer Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


module.exports = router;

