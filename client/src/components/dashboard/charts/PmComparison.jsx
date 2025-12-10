import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function PmComparison({ data = [] }) {
    // Трансформуємо дані для графіка
    const chartData = data.map((item) => ({
        city: item.locationName || "Невідомо",
        pm25: item.pm25 || 0,
        pm10: item.pm10 || 0,
    }));

    if (!chartData || chartData.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
                Немає даних для відображення
            </div>
        );
    }

    return (
        <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    barGap={6}
                    margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
                >
                    <XAxis
                        dataKey="city"
                        tickMargin={4}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis unit=" μg/m³" tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend
                        verticalAlign="top"
                        align="right"
                        height={28}
                        wrapperStyle={{ fontSize: 12 }}
                    />

                    <Bar
                        dataKey="pm25"
                        name="PM2.5"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                    />
                    <Bar
                        dataKey="pm10"
                        name="PM10"
                        fill="#10B981"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
