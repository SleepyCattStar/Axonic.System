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