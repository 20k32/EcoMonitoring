// Утиліта для роботи з AQI рівнями і кольорами

export const getAqiLevel = (aqi) => {
    if (aqi <= 50) return "Добре";
    if (aqi <= 100) return "Помірне";
    if (aqi <= 150) return "Нечисте";
    if (aqi <= 200) return "Дуже нечисте";
    return "Небезпечне";
};

export const getAqiColor = (aqi) => {
    if (aqi <= 50) return "bg-green-100 text-green-700";
    if (aqi <= 100) return "bg-yellow-100 text-yellow-700";
    if (aqi <= 150) return "bg-orange-100 text-orange-700";
    if (aqi <= 200) return "bg-red-100 text-red-700";
    return "bg-purple-100 text-purple-700";
};

export const getAqiHexColor = (aqi) => {
    if (aqi <= 50) return "#22C55E";
    if (aqi <= 100) return "#EAB308";
    if (aqi <= 150) return "#F97316";
    if (aqi <= 200) return "#EF4444";
    return "#A855F7";
};

export const getAqiBadgeColor = (aqi) => {
    if (aqi <= 50) return "bg-green-200 text-green-800";
    if (aqi <= 100) return "bg-yellow-200 text-yellow-800";
    if (aqi <= 150) return "bg-orange-200 text-orange-800";
    if (aqi <= 200) return "bg-red-200 text-red-800";
    return "bg-purple-200 text-purple-800";
};
