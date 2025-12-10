import { useEcoData } from "../../hooks/useEcoData";
import { useRefresh } from "../../context/RefreshContext";
import { getAqiColor } from "../../utils/aqi";

const MonitoringStationsTable = ({ countryId }) => {
    const {
        data: rows,
        loading,
        error,
        refresh,
        countryLabel,
    } = useEcoData(countryId);
    const { triggerRefresh } = useRefresh();

    const handleRefresh = async () => {
        try {
            await triggerRefresh();
            await refresh();
        } catch (e) {
            console.error("Помилка оновлення:", e);
        }
    };

    return (
        <div className="mt-8 rounded-[20px] border-2 border-[#E5E7EB] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.07)] p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">
                    Моніторингові станції - {countryLabel}
                </h1>
                <button
                    type="button"
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-[#2563EB] text-white rounded-md hover:bg-[#1D4ED8]"
                >
                    Оновити
                </button>
            </div>

            {error && <div className="text-red-600 mb-3">Помилка: {error}</div>}
            {loading ? (
                <div>Дані завантажуються…</div>
            ) : rows.length ? (
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed text-left">
                        <thead className="bg-[#F9FAFB]">
                            <tr>
                                <th className="px-4 py-2 uppercase text-[#6B7280] flex-1">
                                    Location
                                </th>
                                <th className="px-4 py-2 uppercase text-[#6B7280] flex-1">
                                    AQI
                                </th>
                                <th className="px-4 py-2 uppercase text-[#6B7280] flex-1">
                                    PM10
                                </th>
                                <th className="px-4 py-2 uppercase text-[#6B7280] flex-1">
                                    PM2.5
                                </th>
                                <th className="px-4 py-2 uppercase text-[#6B7280] flex-1">
                                    Updated
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((item, index) => (
                                <tr key={item._id} className="bg-white">
                                    <td
                                        className={`px-4 py-2 ${
                                            index < rows.length - 1
                                                ? "border-b-[2px] border-[#E5E7EB]"
                                                : ""
                                        }`}
                                    >
                                        {item.locationName}
                                    </td>
                                    <td
                                        className={`px-4 ${
                                            index < rows.length - 1
                                                ? "border-b-[2px] border-[#E5E7EB]"
                                                : ""
                                        }`}
                                    >
                                        <span
                                            className={`inline-block px-4 rounded-2xl font-semibold text-center min-w-[50px] ${getAqiColor(
                                                item.airQualityIndex,
                                            )}`}
                                        >
                                            {item.airQualityIndex}
                                        </span>
                                    </td>
                                    <td
                                        className={`px-4 py-2 ${
                                            index < rows.length - 1
                                                ? "border-b-[2px] border-[#E5E7EB]"
                                                : ""
                                        }`}
                                    >
                                        {item.pm10}
                                    </td>
                                    <td
                                        className={`px-4 py-2 ${
                                            index < rows.length - 1
                                                ? "border-b-[2px] border-[#E5E7EB]"
                                                : ""
                                        }`}
                                    >
                                        {item.pm25}
                                    </td>
                                    <td
                                        className={`px-4 py-2 text-[#6B7280] ${
                                            index < rows.length - 1
                                                ? "border-b-[2px] border-[#E5E7EB]"
                                                : ""
                                        }`}
                                    >
                                        {item.updatedAt
                                            ? new Date(
                                                  item.updatedAt,
                                              ).toLocaleString("uk-UA", {
                                                  day: "2-digit",
                                                  month: "2-digit",
                                                  year: "numeric",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                              })
                                            : "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>Даних немає</div>
            )}
        </div>
    );
};

export default MonitoringStationsTable;
