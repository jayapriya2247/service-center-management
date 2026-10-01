const express = require("express");
const Technician = require("../models/Technician");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE TECHNICIAN
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            name,
            phone,
            email,
            specialization,
            experience,
            status
        } = req.body;

        if (!name || !phone || !email || !specialization || experience === undefined) {
            return res.status(400).json({
                message: "All technician fields are required"
            });
        }

        const technician = await Technician.create({
            name,
            phone,
            email,
            specialization,
            experience,
            status: status || "Available"
        });

        res.status(201).json({
            message: "Technician created successfully",
            technician
        });

    } catch (error) {
        console.error("Create Technician Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// GET ALL TECHNICIANS
router.get("/", authMiddleware, async (req, res) => {
    try {
        const technicians = await Technician.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            count: technicians.length,
            technicians
        });

    } catch (error) {
        console.error("Get Technicians Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// GET TECHNICIAN BY ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const technician = await Technician.findById(req.params.id);

        if (!technician) {
            return res.status(404).json({
                message: "Technician not found"
            });
        }

        res.status(200).json(technician);

    } catch (error) {
        console.error("Get Technician Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// UPDATE TECHNICIAN
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const technician = await Technician.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!technician) {
            return res.status(404).json({
                message: "Technician not found"
            });
        }

        res.status(200).json({
            message: "Technician updated successfully",
            technician
        });

    } catch (error) {
        console.error("Update Technician Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// DELETE TECHNICIAN
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const technician = await Technician.findByIdAndDelete(
            req.params.id
        );

        if (!technician) {
            return res.status(404).json({
                message: "Technician not found"
            });
        }

        res.status(200).json({
            message: "Technician deleted successfully"
        });

    } catch (error) {
        console.error("Delete Technician Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = router;