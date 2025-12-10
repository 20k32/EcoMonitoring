import logo from "../../assets/logo.png";
import clockIcon from "../../assets/clock-icon.svg";
import refreshIcon from "../../assets/refresh-icon.svg";
import { useRefresh } from "../../context/RefreshContext";

const Header = () => {
    const { lastUpdate, isRefreshing, triggerRefresh } = useRefresh();

    return (
        <header className="bg-white flex justify-between py-6 px-44 shadow-soft">
            <div className="flex gap-3.5 items-center flex-row">
                <img src={logo} alt="Logo" />
                <div>
                    <h1 className="text-3xl font-semibold">
                        Екологічний моніторинг
                    </h1>
                    <p className="text-[#6B7280] text-lg font-semibold">
                        Лабораторна робота
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <img src={clockIcon} alt="Clock Icon" />
                    <p className="text-[#4B5563] text-lg font-semibold">
                        Останнє оновлення: {lastUpdate}
                    </p>
                </div>
                <button
                    onClick={triggerRefresh}
                    disabled={isRefreshing}
                    className="bg-[#2563EB] hover:bg-[#1D4ED8] cursor-pointer border-none rounded-md flex flex-row gap-2 px-6 py-3.75 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <img src={refreshIcon} alt="Refresh Icon" />
                    <p className="text-white text-xl">
                        {isRefreshing ? "Оновлення..." : "Оновити всі дані"}
                    </p>
                </button>
            </div>
        </header>
    );
};

export default Header;
