const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        specialization: {
            type: String,
            required: true,
            trim: true
        },

        experience: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: ["Available", "Busy", "On Leave"],
            default: "Available"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Technician", technicianSchema);