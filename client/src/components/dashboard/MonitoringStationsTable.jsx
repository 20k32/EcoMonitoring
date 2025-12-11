import { useEcoData } from "../../hooks/useEcoData";
import { useRefresh } from "../../context/RefreshContext";
import { getAqiColor } from "../../utils/aqi";
import { useState, useMemo } from "react";

const MonitoringStationsTable = ({ countryId }) => {
    const {
        data: rows,
        loading,
        error,
        refresh,
        countryLabel,
    } = useEcoData(countryId);
    const { triggerRefresh } = useRefresh();
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const sortedRows = useMemo(() => {
        if (!sortConfig.key) return rows;

        return [...rows].sort((a, b) => {
            let aVal, bVal;

            switch (sortConfig.key) {
                case "location":
                    aVal = a.locationName || "";
                    bVal = b.locationName || "";
                    break;
                case "aqi":
                    aVal = a.airQualityIndex || 0;
                    bVal = b.airQualityIndex || 0;
                    break;
                case "pm10":
                    aVal = a.pm10 || 0;
                    bVal = b.pm10 || 0;
                    break;
                case "pm25":
                    aVal = a.pm25 || 0;
                    bVal = b.pm25 || 0;
                    break;
                case "updated":
                    aVal = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
                    bVal = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
                    break;
                default:
                    return 0;
            }

            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [rows, sortConfig]);

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
                                <th
                                    className="px-4 py-2 uppercase text-[#6B7280] flex-1 cursor-pointer hover:bg-gray-100 select-none"
                                    onClick={() => handleSort("location")}
                                >
                                    Location{" "}
                                    {sortConfig.key === "location" &&
                                        (sortConfig.direction === "asc"
                                            ? "↑"
                                            : "↓")}
                                </th>
                                <th
                                    className="px-4 py-2 uppercase text-[#6B7280] flex-1 cursor-pointer hover:bg-gray-100 select-none"
                                    onClick={() => handleSort("aqi")}
                                >
                                    AQI{" "}
                                    {sortConfig.key === "aqi" &&
                                        (sortConfig.direction === "asc"
                                            ? "↑"
                                            : "↓")}
                                </th>
                                <th
                                    className="px-4 py-2 uppercase text-[#6B7280] flex-1 cursor-pointer hover:bg-gray-100 select-none"
                                    onClick={() => handleSort("pm10")}
                                >
                                    PM10{" "}
                                    {sortConfig.key === "pm10" &&
                                        (sortConfig.direction === "asc"
                                            ? "↑"
                                            : "↓")}
                                </th>
                                <th
                                    className="px-4 py-2 uppercase text-[#6B7280] flex-1 cursor-pointer hover:bg-gray-100 select-none"
                                    onClick={() => handleSort("pm25")}
                                >
                                    PM2.5{" "}
                                    {sortConfig.key === "pm25" &&
                                        (sortConfig.direction === "asc"
                                            ? "↑"
                                            : "↓")}
                                </th>
                                <th
                                    className="px-4 py-2 uppercase text-[#6B7280] flex-1 cursor-pointer hover:bg-gray-100 select-none"
                                    onClick={() => handleSort("updated")}
                                >
                                    Updated{" "}
                                    {sortConfig.key === "updated" &&
                                        (sortConfig.direction === "asc"
                                            ? "↑"
                                            : "↓")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedRows.map((item, index) => (
                                <tr key={item._id} className="bg-white">
                                    <td
                                        className={`px-4 py-2 ${
                                            index < sortedRows.length - 1
                                                ? "border-b-[2px] border-[#E5E7EB]"
                                                : ""
                                        }`}
                                    >
                                        {item.locationName}
                                    </td>
                                    <td
                                        className={`px-4 ${
                                            index < sortedRows.length - 1
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
                                            index < sortedRows.length - 1
                                                ? "border-b-[2px] border-[#E5E7EB]"
                                                : ""
                                        }`}
                                    >
                                        {item.pm10}
                                    </td>
                                    <td
                                        className={`px-4 py-2 ${
                                            index < sortedRows.length - 1
                                                ? "border-b-[2px] border-[#E5E7EB]"
                                                : ""
                                        }`}
                                    >
                                        {item.pm25}
                                    </td>
                                    <td
                                        className={`px-4 py-2 text-[#6B7280] ${
                                            index < sortedRows.length - 1
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
