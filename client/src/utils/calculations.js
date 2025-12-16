/**
 * Pollution damage calculation utilities
 */

/**
 * Calculate damage from excessive emissions
 * Formula: Damage = Mass × BaseRate × kT × kR × kOther
 *
 * @param {Object} data - Calculation data
 * @param {number} data.massExcess - Excess emission mass in tonnes
 * @param {number} data.baseRate - Base rate in UAH/t
 * @param {number} data.kT - Temperature coefficient
 * @param {number} data.kR - Regional coefficient
 * @param {number} data.kOther - Other coefficient (default: 1)
 * @returns {Object} Calculation result with total and multiplier
 */
export const calculateDamage = ({
    massExcess = 0,
    baseRate = 0,
    kT = 1,
    kR = 1,
    kOther = 1,
}) => {
    const mass = parseFloat(massExcess) || 0;
    const rate = parseFloat(baseRate) || 0;
    const kt = parseFloat(kT) || 1;
    const kr = parseFloat(kR) || 1;
    const kother = parseFloat(kOther) || 1;

    const multiplier = kt * kr * kother;
    const total = mass * rate * multiplier;

    return {
        multiplier,
        total,
    };
};

/**
 * Format calculation data for API submission
 *
 * @param {Object} formData - Form input data
 * @param {Object} calculationResult - Result from calculateDamage
 * @returns {Object} Formatted calculation object for backend
 */
export const formatCalculationForAPI = (formData, calculationResult) => {
    const { massExcess, baseRate, kT, kR, kOther } = formData;

    return {
        pollutant: formData.pollutant,
        massExcess: parseFloat(massExcess) || 0,
        baseRate: parseFloat(baseRate) || 0,
        kT: parseFloat(kT) || 1,
        kR: parseFloat(kR) || 1,
        kOther: parseFloat(kOther) || 1,
        total: calculationResult.total,
        multiplier: calculationResult.multiplier,
    };
};

/**
 * Generate random calculation data for testing
 *
 * @param {Array} pollutants - Array of available pollutants
 * @returns {Object} Random form data
 */
export const generateRandomData = (pollutants) => {
    const randomPollutant =
        pollutants[Math.floor(Math.random() * pollutants.length)].value;

    return {
        pollutant: randomPollutant,
        massExcess: (Math.random() * 100 + 1).toFixed(2),
        baseRate: (Math.random() * 5000 + 500).toFixed(2),
        kT: (Math.random() * 2 + 0.5).toFixed(2),
        kR: (Math.random() * 2 + 0.5).toFixed(2),
        kOther: (Math.random() * 1.5 + 0.5).toFixed(2),
    };
};

/**
 * Save calculation to backend API
 *
 * @param {Object} calculation - Formatted calculation object
 * @param {string} apiUrl - Backend API endpoint (default: localhost:3000)
 * @returns {Promise<Object>} Saved calculation with _id from backend
 * @throws {Error} If API request fails
 */
export const saveCalculationToAPI = async (
    calculation,
    apiUrl = "http://localhost:3000/api/calculations",
) => {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(calculation),
    });

    if (!response.ok) {
        throw new Error("Failed to save calculation");
    }

    return await response.json();
};

/**
 * Format number as currency for display
 *
 * @param {number} value - Number to format
 * @param {string} locale - Locale for formatting (default: 'uk-UA')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, locale = "uk-UA") => {
    return parseFloat(value).toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

/**
 * Format date for display
 *
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'uk-UA')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = "uk-UA") => {
    return new Date(date).toLocaleString(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};
