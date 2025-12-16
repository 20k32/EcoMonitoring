import React, { useState, useEffect } from "react";

const HistoryTable = ({ refresh }) => {
    const [calculations, setCalculations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCalculations();
    }, [refresh]);

    const fetchCalculations = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "http://localhost:3000/api/calculations",
            );

            if (!response.ok) {
                throw new Error("Failed to fetch calculations");
            }

            const data = await response.json();
            setCalculations(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching calculations:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="mb-8 rounded-[20px] border-2 border-[#E5E7EB] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.07)] p-6">
                <p className="text-gray-600">Завантаження історії...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mb-8 rounded-[20px] border-2 border-[#E5E7EB] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.07)] p-6">
                <p className="text-red-600">Помилка: {error}</p>
            </div>
        );
    }

    if (!calculations || calculations.length === 0) {
        return null;
    }

    return (
        <div className="mb-8 rounded-[20px] border-2 border-[#E5E7EB] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.07)] p-6">
            <h2 className="text-xl font-semibold mb-4">Історія розрахунків</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#F9FAFB]">
                        <tr>
                            <th className="px-4 py-3 text-[#6B7280] font-medium">
                                Дата та час
                            </th>
                            <th className="px-4 py-3 text-[#6B7280] font-medium">
                                Забруднювач
                            </th>
                            <th className="px-4 py-3 text-[#6B7280] font-medium">
                                Маса (т)
                            </th>
                            <th className="px-4 py-3 text-[#6B7280] font-medium">
                                Базовий норматив
                            </th>
                            <th className="px-4 py-3 text-[#6B7280] font-medium">
                                Множник
                            </th>
                            <th className="px-4 py-3 text-[#6B7280] font-medium">
                                Сума збитків (грн)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {calculations.map((calc) => (
                            <tr
                                key={calc._id}
                                className="border-t border-[#E5E7EB]"
                            >
                                <td className="px-4 py-3">
                                    {new Date(calc.createdAt).toLocaleString(
                                        "uk-UA",
                                        {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        },
                                    )}
                                </td>
                                <td className="px-4 py-3 font-medium">
                                    {calc.pollutant}
                                </td>
                                <td className="px-4 py-3">
                                    {parseFloat(calc.massExcess).toFixed(2)}
                                </td>
                                <td className="px-4 py-3">
                                    {parseFloat(calc.baseRate).toFixed(2)}
                                </td>
                                <td className="px-4 py-3">
                                    {calc.multiplier.toFixed(4)}
                                </td>
                                <td className="px-4 py-3 font-semibold text-[#2563EB]">
                                    {calc.total.toLocaleString("uk-UA", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryTable;
