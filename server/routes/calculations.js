const express = require("express");
const router = express.Router();
const Calculation = require("../models/Calculation");

// GET all calculations (sorted by most recent)
router.get("/", async (req, res) => {
    try {
        const calculations = await Calculation.find()
            .sort({ createdAt: -1 })
            .limit(100); // Limit to last 100 calculations

        res.json(calculations);
    } catch (error) {
        console.error("Error fetching calculations:", error);
        res.status(500).json({ error: "Failed to fetch calculations" });
    }
});

// POST new calculation
router.post("/", async (req, res) => {
    try {
        const {
            pollutant,
            massExcess,
            baseRate,
            kT,
            kR,
            kOther,
            multiplier,
            total,
        } = req.body;

        // Validation
        if (
            !pollutant ||
            !massExcess ||
            !baseRate ||
            !kT ||
            !kR ||
            !multiplier ||
            !total
        ) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const calculation = new Calculation({
            pollutant,
            massExcess: parseFloat(massExcess),
            baseRate: parseFloat(baseRate),
            kT: parseFloat(kT),
            kR: parseFloat(kR),
            kOther: parseFloat(kOther) || 1,
            multiplier: parseFloat(multiplier),
            total: parseFloat(total),
        });

        await calculation.save();
        res.status(201).json(calculation);
    } catch (error) {
        console.error("Error creating calculation:", error);
        res.status(500).json({ error: "Failed to save calculation" });
    }
});

// DELETE calculation by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Calculation.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: "Calculation not found" });
        }

        res.json({ message: "Calculation deleted successfully" });
    } catch (error) {
        console.error("Error deleting calculation:", error);
        res.status(500).json({ error: "Failed to delete calculation" });
    }
});

module.exports = router;
