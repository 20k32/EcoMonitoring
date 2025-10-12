const mongoose = require('mongoose');

const ecoDataSchema = new mongoose.Schema({
    country: String,
    locationName: String,
    airQualityIndex: Number,
    pm10: Number,
    pm25: Number,
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EcoDataObject', ecoDataSchema);