import React from "react";

const StatisticsCard = ({ data: ecoData = [] }) => {
    // Статистика
    const activeStations = ecoData.length;
    const bestAqi =
        ecoData.length > 0
            ? Math.min(...ecoData.map((item) => item.airQualityIndex || 0))
            : 0;
    const worstAqi =
        ecoData.length > 0
            ? Math.max(...ecoData.map((item) => item.airQualityIndex || 0))
            : 0;

    return (
        <div className="space-y-[25px]">
            {/* Станцій активно */}
            <div className="flex justify-between items-center">
                <span className="text-[20px] font-semibold text-[#4B5563]">
                    Станцій активно:
                </span>
                <span className="text-[20px] font-semibold text-[#111827]">
                    {activeStations}
                </span>
            </div>

            {/* Найкращий AQI */}
            <div className="flex justify-between items-center">
                <span className="text-[20px] font-semibold text-[#4B5563]">
                    Найкращий AQI:
                </span>
                <span className="text-[20px] font-semibold text-green-600">
                    {bestAqi}
                </span>
            </div>

            {/* Найгірший AQI */}
            <div className="flex justify-between items-center">
                <span className="text-[20px] font-semibold text-[#4B5563]">
                    Найгірший AQI:
                </span>
                <span className="text-[20px] font-semibold text-red-600">
                    {worstAqi}
                </span>
            </div>
        </div>
    );
};

export default StatisticsCard;
