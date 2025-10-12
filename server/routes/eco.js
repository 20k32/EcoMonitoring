const express = require("express");
const axios = require("axios");
const router = express.Router();
const EcoData = require("../models/EcoDataObject");
const mongoose = require('mongoose');

// fallback mock data
let testData = [
    {
        _id: new mongoose.Types.ObjectId().toString(),
        country: "Ukraine",
        locationName: "Kyiv",
        airQualityIndex: 55,
        pm10: 20,
        pm25: 12,
        updatedAt: new Date().toISOString()
    },
    {
        _id: new mongoose.Types.ObjectId().toString(),
        country: "Poland",
        locationName: "Warsaw",
        airQualityIndex: 42,
        pm10: 15,
        pm25: 10,
        updatedAt: new Date().toISOString()
    }
];

// GET /api/eco?country=
router.get("/", async (req, res) => {
    const { country } = req.query;
    const filter = country ? { country: country } : {};

    try {
        const data = await EcoData.find(filter);
        if (!data || data.length === 0) {
            console.warn("No DB data found, using test data");
            const filtered = country
                ? testData.filter(d => d.country === country)
                : testData;
            return res.json(filtered);
        }
        res.json(data);
    } catch (err) {
        console.error("DB error, returning test data:", err.message);
        const filtered = country
            ? testData.filter(d => d.country === country)
            : testData;
        res.json(filtered);
    }
});

// PUT /api/eco/:id
router.put("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        let updated;
        console.log(id);
        if (mongoose.Types.ObjectId.isValid(id)) {
            updated = await EcoData.findByIdAndUpdate(id, req.body, { new: true, upsert: true });
        }
        if (!updated) {
            // fallback to test data
            const index = testData.findIndex(d => d._id === id);
            if (index === -1) return res.status(404).json({ error: "Not found" });
            testData[index] = { ...testData[index], ...req.body };
            return res.json(testData[index]);
        }
        res.json(updated);
    } catch (err) {
        console.error("DB update error, falling back to test data:", err.message);
        const index = testData.findIndex(d => d._id === id);
        if (index === -1) return res.status(404).json({ error: "Not found" });
        testData[index] = { ...testData[index], ...req.body };
        res.json(testData[index]);
    }
});


// POST /api/eco/fetch
router.post("/fetch", async (req, res) => {
    try {
        const countries = ["Ukraine", "Poland"];

        for (const country of countries) {
            const response = await axios.get(`https://api.saveecobot.com/${country}/stations`);
            const stations = response.data;

            for (const s of stations) {
                await EcoData.findOneAndUpdate(
                    { locationName: s.name },
                    {
                        country: country,
                        locationName: s.name,
                        airQualityIndex: s.aqi,
                        pm10: s.pm10,
                        pm25: s.pm25,
                        updatedAt: new Date()
                    },
                    { upsert: true, new: true }
                );
            }
        }

        res.json({ message: "EcoData updated successfully" });
    } catch (err) {
        console.error("API fetch failed, returning test data:", err.message);
        res.status(200).json({
            message: "Using test data because API fetch failed",
            testData
        });
    }
});

module.exports = router;
