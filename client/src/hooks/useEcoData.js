import { useCallback, useEffect, useMemo, useState } from "react";
import { COUNTRIES } from "../utils/constants";
import { refreshAllData, fetchEcoByCountry } from "../utils/refreshData";
import { useRefresh } from "../context/RefreshContext";

const backendCountryById = (id) => {
    switch (id) {
        case "ua":
            return "Ukraine";
        case "pl":
            return "Poland";
        default:
            return id;
    }
};

export function useEcoData(countryId) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { refreshTrigger } = useRefresh();

    const countryLabel = useMemo(() => {
        return COUNTRIES.find((c) => c.id === countryId)?.label || countryId;
    }, [countryId]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const country = backendCountryById(countryId);
            const rows = await fetchEcoByCountry(country);
            setData(rows);
        } catch (e) {
            setError(e.message || "Fetch error");
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [countryId]);

    const refresh = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            await refreshAllData();
            await fetchData();
        } catch (e) {
            setError(e.message || "Refresh error");
        } finally {
            setLoading(false);
        }
    }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, [fetchData, refreshTrigger]);

    return { data, loading, error, refresh, countryLabel };
}
