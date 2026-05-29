import axios from "axios";

const BASE_URL =
    "http://127.0.0.1:8000/api";

export const fetchSystemStats =
async () => {

    const response =
        await axios.get(
            `${BASE_URL}/system-stats`
        );

    return response.data;
};

export const fetchProcesses =
async () => {

    const response =
        await axios.get(
            `${BASE_URL}/processes`
        );

    return response.data;
};

export const fetchHistory =
async () => {

    const response =
        await axios.get(
            `${BASE_URL}/history`
        );

    return response.data;
};

export const fetchSystemInfo =
async () => {

    const response =
        await axios.get(
            `${BASE_URL}/system-info`
        );

    return response.data;
};

// FIXED MISMATCHES OF BASE, TO BASE_URL

export const fetchAnalyticsDaily = async () => {
    const res = await axios.get(`${BASE_URL}/analytics/daily`);
    return res.data;
};

export const fetchAnalyticsWeekly = async () => {
    const res = await axios.get(`${BASE_URL}/analytics/weekly`);
    return res.data;
};

export const fetchDailyHistory = async () => {

    const res = await axios.get(
        `${BASE_URL}/analytics/history/daily`
    );

    return res.data;
};

export const fetchWeeklyHistory = async () => {

    const res = await axios.get(
        `${BASE_URL}/analytics/history/weekly`
    );

    return res.data;
};

export const fetchProcessLoad = async () => {

    const res = await axios.get(
        `${BASE_URL}/analytics/process-load`
    );

    return res.data;
};

export const fetchCoreUsage = async () => {

    const res = await axios.get(
        `${BASE_URL}/analytics/core-usage`
    );

    return res.data;
};

export const fetchCoreHistory = async () => {

    const res = await axios.get(
        `${BASE_URL}/analytics/core-history`
    );

    return res.data;
};

export const fetchConfig = async () => {

    const res =
        await axios.get(
            `${BASE_URL}/config`
        );

    return res.data;
};

export const updateConfig = async (data) => {

    const res =
        await axios.put(
            `${BASE_URL}/config`,
            data
        );

    return res.data;
};

export const fetchAlerts = async () => {

    const res =
        await axios.get(
            `${BASE_URL}/alerts`
        );

    return res.data;
};

export const fetchGPUStats = async () => {

    const res =
        await axios.get(
            `${BASE_URL}/gpu`
        );

    return res.data;
};