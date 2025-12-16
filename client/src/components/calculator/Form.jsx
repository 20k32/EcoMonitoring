import React, { useState } from "react";
import {
    calculateDamage,
    formatCalculationForAPI,
    generateRandomData,
    saveCalculationToAPI,
    formatCurrency,
    formatDate,
} from "../../utils/calculations";
import { POLLUTANTS, API_BASE } from "../../utils/constants";

const Form = ({ isOpen, onClose, onCalculate }) => {
    const [formData, setFormData] = useState({
        pollutant: "SO2",
        massExcess: "",
        baseRate: "",
        kT: "",
        kR: "",
        kOther: "",
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCalculate = async () => {
        try {
            // Calculate damage using utility function
            const calculationResult = calculateDamage(formData);

            // Format data for API
            const calculation = formatCalculationForAPI(
                formData,
                calculationResult,
            );

            // Save to backend
            const savedCalculation = await saveCalculationToAPI(
                calculation,
                `${API_BASE}/api/calculations`,
            );

            setResult(savedCalculation);

            if (onCalculate) {
                onCalculate(savedCalculation);
            }
        } catch (error) {
            console.error("Error saving calculation:", error);
            alert("Помилка при збереженні розрахунку");
        }
    };

    const handleGenerate = () => {
        const randomData = generateRandomData(POLLUTANTS);
        setFormData(randomData);
        setResult(null);
    };

    const handleReset = () => {
        setFormData({
            pollutant: "SO2",
            massExcess: "",
            baseRate: "",
            kT: "",
            kR: "",
            kOther: "",
        });
        setResult(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.07)] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold">
                            Розрахунок збитків від наднормативних викидів
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                        >
                            ×
                        </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        {/* Pollutant Select */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Забруднювач *
                            </label>
                            <select
                                name="pollutant"
                                value={formData.pollutant}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                            >
                                {POLLUTANTS.map((p) => (
                                    <option key={p.value} value={p.value}>
                                        {p.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Mass Excess */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Маса наднормативного викиду (т) *
                            </label>
                            <input
                                type="number"
                                name="massExcess"
                                value={formData.massExcess}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                placeholder="Введіть масу"
                            />
                        </div>

                        {/* Base Rate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Базовий норматив (грн/т) *
                            </label>
                            <input
                                type="number"
                                name="baseRate"
                                value={formData.baseRate}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                placeholder="Введіть базовий норматив"
                            />
                        </div>

                        {/* kT */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Коефіцієнт kT *
                            </label>
                            <input
                                type="number"
                                name="kT"
                                value={formData.kT}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                placeholder="Введіть коефіцієнт kT"
                            />
                        </div>

                        {/* kR */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Коефіцієнт kR *
                            </label>
                            <input
                                type="number"
                                name="kR"
                                value={formData.kR}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                placeholder="Введіть коефіцієнт kR"
                            />
                        </div>

                        {/* kOther */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Інший коефіцієнт (опціонально)
                            </label>
                            <input
                                type="number"
                                name="kOther"
                                value={formData.kOther}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                                placeholder="За замовчуванням = 1"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={handleCalculate}
                                className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-md hover:bg-[#1D4ED8] font-medium"
                            >
                                Розрахувати
                            </button>
                            <button
                                onClick={handleGenerate}
                                className="flex-1 px-4 py-2 bg-[#10B981] text-white rounded-md hover:bg-[#059669] font-medium"
                            >
                                Згенерувати дані
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium"
                            >
                                Скинути
                            </button>
                        </div>
                    </div>

                    {/* Result */}
                    {result && (
                        <div className="mt-6 p-6 bg-[#F9FAFB] rounded-lg border-2 border-[#E5E7EB]">
                            <h3 className="text-xl font-semibold mb-4">
                                Результат розрахунку
                            </h3>

                            {/* Total Amount */}
                            <div className="mb-4 p-4 bg-white rounded-lg">
                                <div className="text-sm text-gray-600 mb-1">
                                    Сума збитків
                                </div>
                                <div className="text-3xl font-bold text-[#2563EB]">
                                    {formatCurrency(result.total)} грн
                                </div>
                            </div>

                            {/* Passport of calculation */}
                            <div className="text-sm space-y-2">
                                <h4 className="font-semibold text-gray-700 mb-2">
                                    Паспорт розрахунку:
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <span className="text-gray-600">
                                            Забруднювач:
                                        </span>
                                    </div>
                                    <div className="font-medium">
                                        {result.pollutant}
                                    </div>

                                    <div>
                                        <span className="text-gray-600">
                                            Маса викиду:
                                        </span>
                                    </div>
                                    <div className="font-medium">
                                        {parseFloat(result.massExcess).toFixed(
                                            2,
                                        )}{" "}
                                        т
                                    </div>

                                    <div>
                                        <span className="text-gray-600">
                                            Базовий норматив:
                                        </span>
                                    </div>
                                    <div className="font-medium">
                                        {parseFloat(result.baseRate).toFixed(2)}{" "}
                                        грн/т
                                    </div>

                                    <div>
                                        <span className="text-gray-600">
                                            Коефіцієнт kT:
                                        </span>
                                    </div>
                                    <div className="font-medium">
                                        {parseFloat(result.kT).toFixed(2)}
                                    </div>

                                    <div>
                                        <span className="text-gray-600">
                                            Коефіцієнт kR:
                                        </span>
                                    </div>
                                    <div className="font-medium">
                                        {parseFloat(result.kR).toFixed(2)}
                                    </div>

                                    <div>
                                        <span className="text-gray-600">
                                            Інший коефіцієнт:
                                        </span>
                                    </div>
                                    <div className="font-medium">
                                        {parseFloat(result.kOther || 1).toFixed(
                                            2,
                                        )}
                                    </div>

                                    <div>
                                        <span className="text-gray-600">
                                            Загальний множник:
                                        </span>
                                    </div>
                                    <div className="font-medium">
                                        {result.multiplier.toFixed(4)}
                                    </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-gray-300">
                                    <div className="text-xs text-gray-500">
                                        Формула: Збитки = Маса × Базовий
                                        норматив × kT × kR × kOther
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Form;
