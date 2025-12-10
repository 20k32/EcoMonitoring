import { useEcoData } from "../../hooks/useEcoData";
import AverageAqiCard from "./charts/AverageAqiCard";
import PmComparison from "./charts/PmComparison";
import StatisticsCard from "./charts/StatisticsCard";
import MonitoringStationsTable from "./MonitoringStationsTable";
import { getAqiLevel, getAqiBadgeColor } from "../../utils/aqi";

const CountryStats = ({ countryId }) => {
    const { data: ecoData } = useEcoData(countryId);

    const averageAqi =
        ecoData.length > 0
            ? Math.round(
                  ecoData.reduce(
                      (sum, item) => sum + (item.airQualityIndex || 0),
                      0,
                  ) / ecoData.length,
              )
            : 0;

    const level = getAqiLevel(averageAqi);
    const badgeColor = getAqiBadgeColor(averageAqi);

    return (
        <section className="py-13">
            <div className="flex gap-8 mb-8 justify-center flex-wrap">
                <div className="w-[500px] h-[365px] rounded-[20px] border-2 border-[#E5E7EB] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.07)] px-[40px] py-[30px] flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[#111827] font-inter text-2xl font-semibold">
                            Середній AQI
                        </h3>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
                        >
                            {level}
                        </span>
                    </div>
                    <div className="flex-1">
                        <AverageAqiCard data={ecoData} />
                    </div>
                </div>
                <div className="w-[500px] h-[365px] rounded-[20px] border-2 border-[#E5E7EB] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.07)] px-[40px] py-[30px] flex flex-col">
                    <h3 className="text-[#111827] font-inter text-2xl font-semibold mb-4">
                        PM2.5 vs PM10
                    </h3>
                    <div className="flex-1">
                        <PmComparison data={ecoData} />
                    </div>
                </div>
                <div className="w-[500px] h-[365px] rounded-[20px] border-2 border-[#E5E7EB] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.07)] px-[40px] py-[30px] flex flex-col">
                    <h3 className="text-[#111827] font-inter text-2xl font-semibold mb-4">
                        Статистика
                    </h3>
                    <div className="flex-1">
                        <StatisticsCard data={ecoData} />
                    </div>
                </div>
            </div>

            <MonitoringStationsTable countryId={countryId} />
        </section>
    );
};

export default CountryStats;
