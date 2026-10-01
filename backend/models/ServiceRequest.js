const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        vehicleNumber: {
            type: String,
            required: true,
            trim: true
        },

        serviceType: {
            type: String,
            required: true,
            trim: true
        },

        problemDescription: {
            type: String,
            required: true,
            trim: true
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },

        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Technician",
            default: null
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Assigned",
                "In Progress",
                "Completed",
                "Cancelled"
            ],
            default: "Pending"
        },

        serviceDate: {
            type: Date,
            required: true
        },

        estimatedCost: {
            type: Number,
            default: 0,
            min: 0
        },

        notes: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "ServiceRequest",
    serviceRequestSchema
);