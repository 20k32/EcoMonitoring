const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
    pollutant: {
        type: String,
        required: true,
        enum: ["SO2", "NOx", "CO", "PM10", "VOC"],
    },
    massExcess: {
        type: Number,
        required: true,
    },
    baseRate: {
        type: Number,
        required: true,
    },
    kT: {
        type: Number,
        required: true,
    },
    kR: {
        type: Number,
        required: true,
    },
    kOther: {
        type: Number,
        default: 1,
    },
    multiplier: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Calculation", calculationSchema);
