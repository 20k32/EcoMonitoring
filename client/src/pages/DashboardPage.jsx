import { Activity, useState, Suspense } from "react";

import TabButton from "../components/ui/TabButton";
import CountryStats from "../components/dashboard/CountryStats";

import { COUNTRIES } from "../utils/constants";

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState("ua");

    return (
        <section className="pt-13 px-44">
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
