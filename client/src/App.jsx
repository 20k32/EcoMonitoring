import Header from "./components/layout/Header";
import DashboardPage from "./pages/DashboardPage";
import { RefreshProvider } from "./context/RefreshContext";

function App() {
    return (
        <RefreshProvider>
            <div>
                <Header />
                <DashboardPage />
            </div>
        </RefreshProvider>
    );
}

export default App;
