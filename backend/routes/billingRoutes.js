const express = require("express");

const Billing = require("../models/Billing");
const ServiceRequest = require("../models/ServiceRequest");
const Customer = require("../models/Customer");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE BILL
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            serviceRequest,
            customer,
            labourCharge,
            partsCharge,
            additionalCharge,
            discount,
            tax,
            paymentStatus,
            paymentMethod,
            invoiceDate,
            notes
        } = req.body;

        if (
            !serviceRequest ||
            !customer ||
            labourCharge === undefined ||
            partsCharge === undefined
        ) {
            return res.status(400).json({
                message: "Service request, customer, labour charge and parts charge are required"
            });
        }

        // Check service request exists
        const existingServiceRequest =
            await ServiceRequest.findById(serviceRequest);

        if (!existingServiceRequest) {
            return res.status(404).json({
                message: "Service request not found"
            });
        }

        // Check customer exists
        const existingCustomer =
            await Customer.findById(customer);

        if (!existingCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        const additional = additionalCharge || 0;
        const discountAmount = discount || 0;
        const taxAmount = tax || 0;

        // Calculate subtotal
        const subtotal =
            Number(labourCharge) +
            Number(partsCharge) +
            Number(additional);

        // Calculate total
        const totalAmount =
            subtotal -
            Number(discountAmount) +
            Number(taxAmount);

        if (totalAmount < 0) {
            return res.status(400).json({
                message: "Total amount cannot be negative"
            });
        }

        const billing = await Billing.create({
            serviceRequest,
            customer,
            labourCharge,
            partsCharge,
            additionalCharge: additional,
            discount: discountAmount,
            tax: taxAmount,
            subtotal,
            totalAmount,
            paymentStatus: paymentStatus || "Pending",
            paymentMethod: paymentMethod || "Not Paid",
            invoiceDate: invoiceDate || Date.now(),
            notes: notes || ""
        });

        res.status(201).json({
            message: "Bill created successfully",
            billing
        });

    } catch (error) {
        console.error("Create Billing Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// GET ALL BILLS
router.get("/", authMiddleware, async (req, res) => {
    try {
        const bills = await Billing.find()
            .populate(
                "serviceRequest",
                "vehicleNumber serviceType problemDescription status"
            )
            .populate(
                "customer",
                "name phone email vehicleNumber vehicleModel"
            )
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: bills.length,
            bills
        });

    } catch (error) {
        console.error("Get Bills Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// GET BILL BY ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const bill = await Billing.findById(req.params.id)
            .populate(
                "serviceRequest",
                "vehicleNumber serviceType problemDescription status"
            )
            .populate(
                "customer",
                "name phone email vehicleNumber vehicleModel"
            );

        if (!bill) {
            return res.status(404).json({
                message: "Bill not found"
            });
        }

        res.status(200).json(bill);

    } catch (error) {
        console.error("Get Bill Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// UPDATE BILL
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const bill = await Billing.findById(req.params.id);

        if (!bill) {
            return res.status(404).json({
                message: "Bill not found"
            });
        }

        const {
            labourCharge,
            partsCharge,
            additionalCharge,
            discount,
            tax,
            paymentStatus,
            paymentMethod,
            invoiceDate,
            notes
        } = req.body;

        if (labourCharge !== undefined) {
            bill.labourCharge = labourCharge;
        }

        if (partsCharge !== undefined) {
            bill.partsCharge = partsCharge;
        }

        if (additionalCharge !== undefined) {
            bill.additionalCharge = additionalCharge;
        }

        if (discount !== undefined) {
            bill.discount = discount;
        }

        if (tax !== undefined) {
            bill.tax = tax;
        }

        if (paymentStatus !== undefined) {
            bill.paymentStatus = paymentStatus;
        }

        if (paymentMethod !== undefined) {
            bill.paymentMethod = paymentMethod;
        }

        if (invoiceDate !== undefined) {
            bill.invoiceDate = invoiceDate;
        }

        if (notes !== undefined) {
            bill.notes = notes;
        }

        // Recalculate amount
        bill.subtotal =
            Number(bill.labourCharge) +
            Number(bill.partsCharge) +
            Number(bill.additionalCharge);

        bill.totalAmount =
            bill.subtotal -
            Number(bill.discount) +
            Number(bill.tax);

        if (bill.totalAmount < 0) {
            return res.status(400).json({
                message: "Total amount cannot be negative"
            });
        }

        await bill.save();

        const updatedBill = await Billing.findById(bill._id)
            .populate(
                "serviceRequest",
                "vehicleNumber serviceType problemDescription status"
            )
            .populate(
                "customer",
                "name phone email vehicleNumber vehicleModel"
            );

        res.status(200).json({
            message: "Bill updated successfully",
            billing: updatedBill
        });

    } catch (error) {
        console.error("Update Billing Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// DELETE BILL
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const bill = await Billing.findByIdAndDelete(
            req.params.id
        );

        if (!bill) {
            return res.status(404).json({
                message: "Bill not found"
            });
        }

        res.status(200).json({
            message: "Bill deleted successfully"
        });

    } catch (error) {
        console.error("Delete Billing Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = router;