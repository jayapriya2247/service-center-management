const express = require("express");

const ServiceRequest = require("../models/ServiceRequest");
const Customer = require("../models/Customer");
const Technician = require("../models/Technician");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE SERVICE REQUEST
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            customer,
            vehicleNumber,
            serviceType,
            problemDescription,
            priority,
            technician,
            status,
            serviceDate,
            estimatedCost,
            notes
        } = req.body;

        if (
            !customer ||
            !vehicleNumber ||
            !serviceType ||
            !problemDescription ||
            !serviceDate
        ) {
            return res.status(400).json({
                message: "Customer, vehicle number, service type, problem description and service date are required"
            });
        }

        // Check customer exists
        const existingCustomer = await Customer.findById(customer);

        if (!existingCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        // Check technician exists if provided
        if (technician) {
            const existingTechnician = await Technician.findById(technician);

            if (!existingTechnician) {
                return res.status(404).json({
                    message: "Technician not found"
                });
            }
        }

        const serviceRequest = await ServiceRequest.create({
            customer,
            vehicleNumber,
            serviceType,
            problemDescription,
            priority: priority || "Medium",
            technician: technician || null,
            status: status || "Pending",
            serviceDate,
            estimatedCost: estimatedCost || 0,
            notes: notes || ""
        });

        res.status(201).json({
            message: "Service request created successfully",
            serviceRequest
        });

    } catch (error) {
        console.error("Create Service Request Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// GET ALL SERVICE REQUESTS
router.get("/", authMiddleware, async (req, res) => {
    try {
        const serviceRequests = await ServiceRequest.find()
            .populate("customer", "name phone email vehicleNumber vehicleModel")
            .populate("technician", "name phone email specialization status")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: serviceRequests.length,
            serviceRequests
        });

    } catch (error) {
        console.error("Get Service Requests Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// GET SERVICE REQUEST BY ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findById(
            req.params.id
        )
            .populate("customer", "name phone email vehicleNumber vehicleModel")
            .populate("technician", "name phone email specialization status");

        if (!serviceRequest) {
            return res.status(404).json({
                message: "Service request not found"
            });
        }

        res.status(200).json(serviceRequest);

    } catch (error) {
        console.error("Get Service Request Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// UPDATE SERVICE REQUEST
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .populate("customer", "name phone email vehicleNumber vehicleModel")
            .populate("technician", "name phone email specialization status");

        if (!serviceRequest) {
            return res.status(404).json({
                message: "Service request not found"
            });
        }

        res.status(200).json({
            message: "Service request updated successfully",
            serviceRequest
        });

    } catch (error) {
        console.error("Update Service Request Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// DELETE SERVICE REQUEST
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findByIdAndDelete(
            req.params.id
        );

        if (!serviceRequest) {
            return res.status(404).json({
                message: "Service request not found"
            });
        }

        res.status(200).json({
            message: "Service request deleted successfully"
        });

    } catch (error) {
        console.error("Delete Service Request Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = router;