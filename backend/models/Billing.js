const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema(
    {
        serviceRequest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceRequest",
            required: true
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        labourCharge: {
            type: Number,
            required: true,
            min: 0
        },

        partsCharge: {
            type: Number,
            required: true,
            min: 0
        },

        additionalCharge: {
            type: Number,
            default: 0,
            min: 0
        },

        discount: {
            type: Number,
            default: 0,
            min: 0
        },

        tax: {
            type: Number,
            default: 0,
            min: 0
        },

        subtotal: {
            type: Number,
            required: true,
            min: 0
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Partially Paid"],
            default: "Pending"
        },

        paymentMethod: {
            type: String,
            enum: ["Cash", "UPI", "Card", "Bank Transfer", "Not Paid"],
            default: "Not Paid"
        },

        invoiceDate: {
            type: Date,
            default: Date.now
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

module.exports = mongoose.model("Billing", billingSchema);