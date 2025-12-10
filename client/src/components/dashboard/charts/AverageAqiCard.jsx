import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getAqiHexColor } from "../../../utils/aqi";

const MAX_AQI = 200;

export default function AverageAqiCard({ data: ecoData = [] }) {
    const averageAqi =
        ecoData.length > 0
            ? Math.round(
                  ecoData.reduce(
                      (sum, item) => sum + (item.airQualityIndex || 0),
                      0,
                  ) / ecoData.length,
              )
            : 0;

    const chartData = [
        { value: averageAqi },
        { value: Math.max(MAX_AQI - averageAqi, 0) },
    ];

    const color = getAqiHexColor(averageAqi);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="relative w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            startAngle={180}
                            endAngle={0}
                            cx="50%"
                            cy="75%"
                            innerRadius="50%"
                            outerRadius="100%"
                            paddingAngle={0}
                            dataKey="value"
                            isAnimationActive={false}
                            style={{
                                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.08))",
                            }}
                        >
                            <Cell fill={color} />
                            <Cell fill="#E5E7EB" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Центрове значення */}
                <div className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-4xl font-bold leading-none">
                        {averageAqi}
                    </p>
                    <p className="text-xs text-gray-400">AQI</p>
                </div>
            </div>
        </div>
    );
}
