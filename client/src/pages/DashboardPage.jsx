import { Activity, useState, Suspense } from "react";

import TabButton from "../components/ui/TabButton";
import CountryStats from "../components/dashboard/CountryStats";

import Form from "../components/calculator/Form";
import HistoryTable from "../components/calculator/HistoryTable";

import { COUNTRIES } from "../utils/constants";

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState("ua");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshHistory, setRefreshHistory] = useState(0);

    const handleCalculate = () => {
        setRefreshHistory((prev) => prev + 1);
    };

    return (
        <section className="pt-13 px-44">
            {/* Calculations Section */}
            <div className="mb-12">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Розрахунок збитків від наднормативних викидів
                    </h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 bg-[#2563EB] text-white rounded-md hover:bg-[#1D4ED8] font-medium shadow-[0_4px_4px_rgba(0,0,0,0.07)] flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path
                                fillRule="evenodd"
                                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Новий розрахунок
                    </button>
                </div>

                {/* Calculator Modal */}
                <Form
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCalculate={handleCalculate}
                />

                {/* History Table */}
                <HistoryTable refresh={refreshHistory} />
            </div>

            {/* Monitoring Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Моніторинг якості повітря
                </h1>
            </div>

            <div className="relative">
                <div className="flex">
                    {COUNTRIES.map((tab) => (
                        <TabButton
                            key={tab.id}
                            isActive={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </TabButton>
                    ))}
                </div>

                <hr className="border-[#E5E7EB] border-t-0.5 absolute bottom-0 left-0 w-full" />
            </div>

            <Suspense fallback={<h1>Дані завантажуються...</h1>}>
                {COUNTRIES.map((tab) => (
                    <Activity
                        key={tab.id}
                        mode={activeTab === tab.id ? "visible" : "hidden"}
                    >
                        <CountryStats countryId={tab.id} />
                    </Activity>
                ))}
            </Suspense>
        </section>
    );
};

export default DashboardPage;
