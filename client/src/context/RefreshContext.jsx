import { createContext, useContext, useState, useCallback } from "react";
import { refreshAllData } from "../utils/refreshData";

const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
    const [lastUpdate, setLastUpdate] = useState(
        new Date().toLocaleString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }),
    );
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const triggerRefresh = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await refreshAllData();
            const now = new Date().toLocaleString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            setLastUpdate(now);
            setRefreshTrigger((prev) => prev + 1);
        } catch (e) {
            console.error("Помилка оновлення даних:", e);
            throw e;
        } finally {
            setIsRefreshing(false);
        }
    }, []);

    return (
        <RefreshContext.Provider
            value={{
                lastUpdate,
                isRefreshing,
                triggerRefresh,
                refreshTrigger,
            }}
        >
            {children}
        </RefreshContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRefresh = () => {
    const context = useContext(RefreshContext);
    if (!context) {
        throw new Error("useRefresh must be used within RefreshProvider");
    }
    return context;
};
