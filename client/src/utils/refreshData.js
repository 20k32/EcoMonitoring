import { API_BASE } from "./constants";

export async function refreshAllData() {
    const res = await fetch(`${API_BASE}/api/eco/fetch`, { method: "POST" });
    if (!res.ok) throw new Error(`Refresh failed: HTTP ${res.status}`);
}

export async function fetchEcoByCountry(backendCountry) {
    const res = await fetch(
        `${API_BASE}/api/eco?country=${encodeURIComponent(backendCountry)}`,
    );
    if (!res.ok) throw new Error(`Fetch failed: HTTP ${res.status}`);
    const json = await res.json();
    return Array.isArray(json) ? json : [];
}
